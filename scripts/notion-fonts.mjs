#!/usr/bin/env node
/**
 * Fixes the "double logo" and adds coloured fonts to the Notion HQ page.
 *
 *   - Page icon -> a clean emoji (the logo already lives in the cover banner,
 *     so using the monogram as the icon too showed it twice).
 *   - Heading "A-Level Accelerators HQ" -> coloured text.
 *   - Each navigation bullet's bold label -> a colour matching its database.
 *
 * Idempotent: safe to run repeatedly.
 *
 * Usage:
 *   NOTION_TOKEN=ntn_xxx NOTION_PARENT_PAGE_ID=<page-id> node scripts/notion-fonts.mjs
 */

const TOKEN = process.env.NOTION_TOKEN;
const PARENT_PAGE_ID =
  process.env.NOTION_PARENT_PAGE_ID || "37338ee471f880d2a290d560aecd3beb";
const NOTION_VERSION = "2022-06-28";
const PAGE_ICON_EMOJI = "🚀";

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

// Colour each database's label to match its theme.
const LABEL_COLOURS = {
  "Outreach Tracker": "blue",
  "Task Board": "green",
  "Products and Pricing": "orange",
  "Funnels and Automations": "purple",
  "Content Calendar": "pink",
  "Business Milestones": "red",
};
const HEADING_COLOUR = "blue";

// Convert a read rich-text item into a writable one, optionally recolouring.
function toWritable(rt, colour) {
  return {
    type: "text",
    text: { content: rt.plain_text, link: rt.href ? { url: rt.href } : null },
    annotations: { ...rt.annotations, color: colour || rt.annotations.color },
  };
}

async function main() {
  console.log(`Styling fonts on page ${PARENT_PAGE_ID}\n`);

  // 1) Fix the double logo by swapping the icon to an emoji.
  console.log("Fixing double logo (icon -> emoji)...");
  await notion(
    `pages/${PARENT_PAGE_ID}`,
    { icon: { type: "emoji", emoji: PAGE_ICON_EMOJI } },
    "PATCH"
  );
  console.log(`  ✓ page icon set to ${PAGE_ICON_EMOJI}\n`);

  // 2) Recolour heading + bullet labels.
  console.log("Colouring fonts...");
  const children = await notion(
    `blocks/${PARENT_PAGE_ID}/children?page_size=100`,
    null,
    "GET"
  );

  for (const block of children.results) {
    if (block.type === "heading_1") {
      const rich = block.heading_1.rich_text.map((rt) => toWritable(rt, HEADING_COLOUR));
      await notion(`blocks/${block.id}`, { heading_1: { rich_text: rich } }, "PATCH");
      console.log(`  ✓ heading coloured ${HEADING_COLOUR}`);
    } else if (block.type === "bulleted_list_item") {
      const segs = block.bulleted_list_item.rich_text;
      const label = segs[0]?.plain_text?.trim();
      const colour = LABEL_COLOURS[label];
      if (!colour) continue; // not one of our nav bullets
      const rich = segs.map((rt, i) => toWritable(rt, i === 0 ? colour : undefined));
      await notion(
        `blocks/${block.id}`,
        { bulleted_list_item: { rich_text: rich } },
        "PATCH"
      );
      console.log(`  ✓ "${label}" coloured ${colour}`);
    }
  }

  console.log("\nDone.");
  console.log(
    `Open your workspace: https://www.notion.so/${PARENT_PAGE_ID.replace(/-/g, "")}`
  );
}

main().catch((err) => {
  console.error("\nFAILED:", err.message);
  process.exit(1);
});
