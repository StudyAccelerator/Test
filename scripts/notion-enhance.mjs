#!/usr/bin/env node
/**
 * Adds visual polish to the "A-Level Accelerators HQ" Notion workspace.
 *
 * This does NOT create new databases. It discovers the six databases that
 * notion-setup.mjs already created (by listing the parent page's children),
 * then styles them in place:
 *   - colours every select / status tag with a sensible palette
 *   - gives each database an emoji icon
 *   - gives the parent page an icon and a gradient cover
 *   - adds one colourful callout banner to the top of the page (guarded so
 *     re-running won't add a second one)
 *
 * Everything here is idempotent — safe to run more than once.
 *
 * Usage:
 *   NOTION_TOKEN=ntn_xxx NOTION_PARENT_PAGE_ID=<page-id> node scripts/notion-enhance.mjs
 *
 * Requires Node 18+ (built-in fetch).
 */

const TOKEN = process.env.NOTION_TOKEN;
const PARENT_PAGE_ID =
  process.env.NOTION_PARENT_PAGE_ID || "37338ee471f880d2a290d560aecd3beb";
const NOTION_VERSION = "2022-06-28";

if (!TOKEN) {
  console.error("ERROR: set NOTION_TOKEN in the environment before running.");
  process.exit(1);
}

async function notion(path, body, method = "POST") {
  const res = await fetch(`https://api.notion.com/v1/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(
      `Notion API ${method} ${path} failed (${res.status}): ${JSON.stringify(json)}`
    );
  }
  return json;
}

// Notion's valid select colours: default, gray, brown, orange, yellow,
// green, blue, purple, pink, red.

// Emoji icon per database title.
const DB_ICONS = {
  "Outreach Tracker": "🤝",
  "Task Board": "✅",
  "Products and Pricing": "🏷️",
  "Funnels and Automations": "⚙️",
  "Content Calendar": "🗓️",
  "Business Milestones": "🎯",
};

// Colour map per database -> property -> { optionName: colour }.
const COLOURS = {
  "Outreach Tracker": {
    Type: {
      School: "blue",
      "Resource Platform": "green",
      "Tutoring Platform": "orange",
      "YouTube Channel": "red",
      Community: "purple",
      "Resource Platform / YouTube": "yellow",
    },
    Status: {
      "Not Started": "gray",
      "Email Sent": "blue",
      "Followed Up": "yellow",
      "Meeting Booked": "orange",
      "Partnership Live": "green",
      Declined: "red",
    },
    Owner: { Waleed: "blue", Bathu: "orange", Iana: "purple" },
  },
  "Task Board": {
    Category: {
      Tracking: "blue",
      "Parent Funnel": "purple",
      "Audience Building": "orange",
      Product: "green",
      "Paid Ads": "pink",
      GCSE: "yellow",
      Hiring: "brown",
    },
    Priority: { Red: "red", Amber: "yellow", Green: "green" },
    Owner: { Waleed: "blue", Bathu: "orange", Iana: "purple" },
    Status: { "To Do": "gray", "In Progress": "blue", Done: "green" },
  },
  "Products and Pricing": {
    Status: {
      Live: "green",
      "On Hold": "yellow",
      Planned: "blue",
      "Free Lead Magnet": "purple",
    },
  },
  "Funnels and Automations": {
    Type: { "Email Automation": "blue", Funnel: "purple", Tracking: "green" },
    Status: { Live: "green", Draft: "yellow", "Not Built": "gray" },
  },
  "Content Calendar": {
    Type: {
      "LinkedIn Post": "blue",
      "Discord Session": "purple",
      "Parent Webinar": "orange",
      Newsletter: "green",
      "School Talk": "pink",
    },
    Status: {
      Idea: "gray",
      Drafted: "yellow",
      Scheduled: "blue",
      Published: "green",
    },
    Owner: { Waleed: "blue", Bathu: "orange", Ianna: "purple" },
  },
  "Business Milestones": {
    Status: { Achieved: "green", "In Progress": "yellow", "Not Started": "gray" },
  },
};

// Discover the child databases on the parent page -> { title: id }.
async function discoverDatabases() {
  const found = {};
  let cursor;
  do {
    const qs = cursor ? `?start_cursor=${cursor}&page_size=100` : "?page_size=100";
    const page = await notion(`blocks/${PARENT_PAGE_ID}/children${qs}`, null, "GET");
    for (const block of page.results) {
      if (block.type === "child_database") {
        const title = block.child_database.title;
        if (found[title]) {
          console.warn(`  ! duplicate database titled "${title}" — using the latest`);
        }
        found[title] = block.id;
      }
    }
    cursor = page.has_more ? page.next_cursor : null;
  } while (cursor);
  return found;
}

// Build a select-property patch that recolours existing options by name.
// We read the live schema so we only touch options that actually exist and
// preserve their type (select vs status).
function buildPropertyPatch(liveProps, colourMap) {
  const patch = {};
  for (const [propName, optionColours] of Object.entries(colourMap)) {
    const live = liveProps[propName];
    if (!live) {
      console.warn(`    ! property "${propName}" not found, skipping`);
      continue;
    }
    // Status properties are read-only for options via the API; only plain
    // select properties can have their option colours updated this way.
    if (live.type !== "select") {
      console.warn(`    ! property "${propName}" is "${live.type}", not a select — skipping`);
      continue;
    }
    const options = live.select.options.map((opt) => ({
      id: opt.id,
      name: opt.name,
      color: optionColours[opt.name] || opt.color || "default",
    }));
    patch[propName] = { select: { options } };
  }
  return patch;
}

async function styleDatabase(title, id) {
  console.log(`Styling: ${title}`);
  const live = await notion(`databases/${id}`, null, "GET");

  // 1) Icon — always works, applied on its own so a colour failure can't block it.
  await notion(
    `databases/${id}`,
    { icon: { type: "emoji", emoji: DB_ICONS[title] || "📊" } },
    "PATCH"
  );
  console.log("  ✓ icon set");

  // 2) Tag colours — best effort. Notion forbids recolouring select options
  //    that already exist, so this will usually be skipped on databases that
  //    were created without explicit colours. We try per-property and report.
  const colourMap = COLOURS[title] || {};
  let recoloured = 0;
  for (const [propName, optionColours] of Object.entries(colourMap)) {
    const patch = buildPropertyPatch(live.properties, { [propName]: optionColours });
    if (Object.keys(patch).length === 0) continue;
    try {
      await notion(`databases/${id}`, { properties: patch }, "PATCH");
      recoloured++;
    } catch (e) {
      console.warn(`    ! could not recolour "${propName}" (Notion locks existing option colours)`);
    }
  }
  if (recoloured > 0) console.log(`  ✓ recoloured ${recoloured} propert${recoloured === 1 ? "y" : "ies"}`);
}

async function stylePage() {
  console.log("Styling parent page (icon + cover)...");
  await notion(
    `pages/${PARENT_PAGE_ID}`,
    {
      icon: { type: "emoji", emoji: "🚀" },
      cover: {
        type: "external",
        external: {
          url: "https://www.notion.so/images/page-cover/gradients_8.png",
        },
      },
    },
    "PATCH"
  );
  console.log("  ✓ page icon and cover set");
}

// Add a colourful callout banner at the very top — but only once.
async function addBannerOnce() {
  const existing = await notion(
    `blocks/${PARENT_PAGE_ID}/children?page_size=100`,
    null,
    "GET"
  );
  const hasCallout = existing.results.some((b) => b.type === "callout");
  if (hasCallout) {
    console.log("Banner callout already present — skipping.");
    return;
  }
  console.log("Adding colourful callout banner...");
  await notion(
    `blocks/${PARENT_PAGE_ID}/children`,
    {
      children: [
        {
          object: "block",
          type: "callout",
          callout: {
            icon: { type: "emoji", emoji: "🚀" },
            color: "purple_background",
            rich_text: [
              {
                text: { content: "A-Level Accelerators HQ — " },
                annotations: { bold: true },
              },
              {
                text: {
                  content:
                    "central command for outreach, tasks, products, funnels, content and milestones. Colour-coded so status is readable at a glance.",
                },
              },
            ],
          },
        },
        { object: "block", type: "divider", divider: {} },
      ],
    },
    "PATCH"
  );
  console.log("  ✓ banner added");
}

async function main() {
  console.log(`Enhancing workspace under page ${PARENT_PAGE_ID}\n`);

  await stylePage();
  await addBannerOnce();
  console.log("");

  const databases = await discoverDatabases();
  const titles = Object.keys(databases);
  if (titles.length === 0) {
    throw new Error(
      "No databases found on the parent page. Run scripts/notion-setup.mjs first."
    );
  }
  console.log(`Found ${titles.length} databases: ${titles.join(", ")}\n`);

  for (const title of titles) {
    await styleDatabase(title, databases[title]);
  }

  console.log("\nDone. Workspace styled.");
  console.log(
    `Open your workspace: https://www.notion.so/${PARENT_PAGE_ID.replace(/-/g, "")}`
  );
}

main().catch((err) => {
  console.error("\nFAILED:", err.message);
  process.exit(1);
});
