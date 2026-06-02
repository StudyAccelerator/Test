#!/usr/bin/env node
/**
 * Rebuilds the six "A-Level Accelerators HQ" databases WITH a curated colour
 * palette and emoji icons baked in at creation time.
 *
 * Why a rebuild: Notion's API auto-assigns a colour to every select option at
 * creation and refuses to recolour existing options. The only way to control
 * tag colours deliberately is to create the databases with colours from the
 * start — so this script archives the current databases (they go to Notion's
 * trash, recoverable for ~30 days) and recreates them, re-seeding the same
 * starter rows.
 *
 * It does NOT touch the parent page's heading, bullets, callout banner or
 * cover — those stay as they are.
 *
 * Usage:
 *   NOTION_TOKEN=ntn_xxx NOTION_PARENT_PAGE_ID=<page-id> node scripts/notion-rebuild.mjs
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

// ---- property + value helpers ----------------------------------------------
const title = (v) => ({ title: [{ text: { content: v } }] });
const text = (v) =>
  v ? { rich_text: [{ text: { content: v } }] } : { rich_text: [] };
const select = (v) => (v ? { select: { name: v } } : { select: null });

const titleProp = () => ({ title: {} });
const textProp = () => ({ rich_text: {} });
const dateProp = () => ({ date: {} });
// Coloured select schema. Pass [["Name","colour"], ...] in display order.
const selectProp = (options) => ({
  select: { options: options.map(([name, color]) => ({ name, color })) },
});

// Create a database (with icon) under the parent page.
async function createDatabase(name, emoji, properties) {
  const db = await notion("databases", {
    parent: { type: "page_id", page_id: PARENT_PAGE_ID },
    icon: { type: "emoji", emoji },
    title: [{ type: "text", text: { content: name } }],
    properties,
  });
  console.log(`  ✓ database created: ${emoji} ${name}`);
  return db.id;
}

async function addRow(databaseId, properties) {
  await notion("pages", { parent: { database_id: databaseId }, properties });
}

// Archive every child database currently on the parent page.
async function archiveExisting() {
  console.log("Archiving existing databases...");
  let cursor;
  let count = 0;
  do {
    const qs = cursor ? `?start_cursor=${cursor}&page_size=100` : "?page_size=100";
    const page = await notion(`blocks/${PARENT_PAGE_ID}/children${qs}`, null, "GET");
    for (const block of page.results) {
      if (block.type !== "child_database") continue;
      const name = block.child_database.title;
      // Archive the database block; this moves it (and its rows) to trash.
      await notion(`blocks/${block.id}`, { archived: true }, "PATCH");
      console.log(`  ✓ archived: ${name}`);
      count++;
    }
    cursor = page.has_more ? page.next_cursor : null;
  } while (cursor);
  if (count === 0) console.log("  (none found)");
  console.log("");
}

async function main() {
  console.log(`Rebuilding databases under page ${PARENT_PAGE_ID}\n`);

  await archiveExisting();

  // === DATABASE 1: Outreach Tracker =========================================
  console.log("DATABASE 1: Outreach Tracker");
  const outreachId = await createDatabase("Outreach Tracker", "🤝", {
    Name: titleProp(),
    Type: selectProp([
      ["School", "blue"],
      ["Resource Platform", "green"],
      ["Tutoring Platform", "orange"],
      ["YouTube Channel", "red"],
      ["Community", "purple"],
      ["Resource Platform / YouTube", "yellow"],
    ]),
    "Contact Name": textProp(),
    "Contact Email or LinkedIn": textProp(),
    Status: selectProp([
      ["Not Started", "gray"],
      ["Email Sent", "blue"],
      ["Followed Up", "yellow"],
      ["Meeting Booked", "orange"],
      ["Partnership Live", "green"],
      ["Declined", "red"],
    ]),
    "Date Contacted": dateProp(),
    Owner: selectProp([
      ["Waleed", "blue"],
      ["Bathu", "orange"],
      ["Iana", "purple"],
    ]),
    Notes: textProp(),
  });
  const outreach = [
    ["Physics and Maths Tutor", "Resource Platform"],
    ["Save My Exams", "Resource Platform"],
    ["Seneca Learning", "Resource Platform"],
    ["Cognito", "Resource Platform / YouTube"],
    ["Primrose Kitten", "YouTube Channel"],
    ["MyTutor", "Tutoring Platform"],
    ["Tutorful", "Tutoring Platform"],
    ["GoStudent", "Tutoring Platform"],
    ["The Student Room", "Community"],
  ];
  for (const [name, type] of outreach) {
    await addRow(outreachId, {
      Name: title(name),
      Type: select(type),
      Status: select("Not Started"),
    });
  }
  console.log(`  ✓ ${outreach.length} entries added\n`);

  // === DATABASE 2: Task Board ===============================================
  console.log("DATABASE 2: Task Board");
  const taskId = await createDatabase("Task Board", "✅", {
    Task: titleProp(),
    Category: selectProp([
      ["Tracking", "blue"],
      ["Parent Funnel", "purple"],
      ["Audience Building", "orange"],
      ["Product", "green"],
      ["Paid Ads", "pink"],
      ["GCSE", "yellow"],
      ["Hiring", "brown"],
    ]),
    Priority: selectProp([
      ["Red", "red"],
      ["Amber", "yellow"],
      ["Green", "green"],
    ]),
    Owner: selectProp([
      ["Waleed", "blue"],
      ["Bathu", "orange"],
      ["Iana", "purple"],
    ]),
    Status: selectProp([
      ["To Do", "gray"],
      ["In Progress", "blue"],
      ["Done", "green"],
    ]),
    "Due Date": dateProp(),
  });
  const tasks = [
    ["Complete ManyChat setup", "Parent Funnel", "Red", "Waleed", "To Do"],
    ["Design and activate parent email automation in MailerLite", "Parent Funnel", "Red", "Waleed", "To Do"],
    ["Run next r/alevel Discord session", "Audience Building", "Red", "Waleed", "To Do"],
    ["Begin daily LinkedIn posting", "Audience Building", "Amber", "Bathu", "In Progress"],
    ["Send distribution partner outreach emails", "Audience Building", "Amber", "Waleed", "To Do"],
    ["Bathu sends sixth form outreach to 20-30 schools", "Audience Building", "Amber", "Bathu", "To Do"],
    ["Launch Facebook ads after ManyChat", "Paid Ads", "Amber", "Bathu", "To Do"],
    ["Build and launch Summer Accelerator page", "Product", "Red", "Waleed", "In Progress"],
    ["Hire Maths tutor", "Hiring", "Amber", "Waleed", "To Do"],
    ["Hire Physics tutor", "Hiring", "Amber", "Waleed", "To Do"],
    ["Open Subject Accelerator Cohort 2 waitlist for September", "Product", "Amber", "Waleed", "To Do"],
    ["Plan first parent webinar", "Parent Funnel", "Green", "Waleed", "To Do"],
    ["Create Year 13 Get Ahead Guide and landing page for school sessions", "Audience Building", "Amber", "Waleed", "To Do"],
    ["GCSE market research and school list", "GCSE", "Green", "Iana", "To Do"],
  ];
  for (const [task, category, priority, owner, status] of tasks) {
    await addRow(taskId, {
      Task: title(task),
      Category: select(category),
      Priority: select(priority),
      Owner: select(owner),
      Status: select(status),
    });
  }
  console.log(`  ✓ ${tasks.length} entries added\n`);

  // === DATABASE 3: Products and Pricing =====================================
  console.log("DATABASE 3: Products and Pricing");
  const productId = await createDatabase("Products and Pricing", "🏷️", {
    Product: titleProp(),
    Price: textProp(),
    Status: selectProp([
      ["Live", "green"],
      ["On Hold", "yellow"],
      ["Planned", "blue"],
      ["Free Lead Magnet", "purple"],
    ]),
    Notes: textProp(),
  });
  const products = [
    ["Free Revision Tracker", "Free", "Free Lead Magnet", "Generates leads into Revision Tracker Users group"],
    ["Parent Guide PDF", "Free", "Free Lead Magnet", "Delivered via parent email automation"],
    ["Summer Accelerator", "£289 one subject / £539 two / £739 three / £849 four", "Planned", "Mid-July to end August"],
    ["Subject Accelerators", "Price increasing for September Cohort 2", "Live", "Biology and Chemistry running, price increasing for September Cohort 2"],
    ["Study Series", "£119, £95 with EARLYBIRD20", "On Hold", "Relaunch September"],
    ["Study Accelerator", "£499, £399 with EARLYBIRD20", "On Hold", "Relaunch September"],
    ["Top 1% Mentorship", "£2,000/year", "Planned", "Application only, not yet promoted"],
    ["Free Strategy Calls", "Free", "Live", "Primary conversion mechanism"],
  ];
  for (const [product, price, status, notes] of products) {
    await addRow(productId, {
      Product: title(product),
      Price: text(price),
      Status: select(status),
      Notes: text(notes),
    });
  }
  console.log(`  ✓ ${products.length} entries added\n`);

  // === DATABASE 4: Funnels and Automations ==================================
  console.log("DATABASE 4: Funnels and Automations");
  const funnelId = await createDatabase("Funnels and Automations", "⚙️", {
    Name: titleProp(),
    Type: selectProp([
      ["Email Automation", "blue"],
      ["Funnel", "purple"],
      ["Tracking", "green"],
    ]),
    Status: selectProp([
      ["Live", "green"],
      ["Draft", "yellow"],
      ["Not Built", "gray"],
    ]),
    Notes: textProp(),
  });
  const funnels = [
    ["Revision Tracker Email Sequence", "Email Automation", "Live", "7 emails over 10 days, 24 subscribers"],
    ["Parent Leads Nurture Sequence", "Email Automation", "Draft", "7 emails over 12 days, needs templates designed and Zoom links added then activate"],
    ["Summer Accelerator Waitlist", "Funnel", "Not Built", "Building landing page now"],
    ["GTM, GA4, Meta Pixel", "Tracking", "Live", "All verified on website"],
    ["ManyChat", "Funnel", "Not Built", "GUIDE and CALL keyword triggers pending"],
  ];
  for (const [name, type, status, notes] of funnels) {
    await addRow(funnelId, {
      Name: title(name),
      Type: select(type),
      Status: select(status),
      Notes: text(notes),
    });
  }
  console.log(`  ✓ ${funnels.length} entries added\n`);

  // === DATABASE 5: Content Calendar =========================================
  console.log("DATABASE 5: Content Calendar");
  const contentId = await createDatabase("Content Calendar", "🗓️", {
    Title: titleProp(),
    Type: selectProp([
      ["LinkedIn Post", "blue"],
      ["Discord Session", "purple"],
      ["Parent Webinar", "orange"],
      ["Newsletter", "green"],
      ["School Talk", "pink"],
    ]),
    Date: dateProp(),
    Status: selectProp([
      ["Idea", "gray"],
      ["Drafted", "yellow"],
      ["Scheduled", "blue"],
      ["Published", "green"],
    ]),
    Owner: selectProp([
      ["Waleed", "blue"],
      ["Bathu", "orange"],
      ["Iana", "purple"],
    ]),
  });
  await addRow(contentId, {
    Title: title("Next r/alevel Discord session, stress and burnout or active recall"),
    Type: select("Discord Session"),
    Status: select("Idea"),
    Owner: select("Waleed"),
  });
  console.log("  ✓ 1 entry added\n");

  // === DATABASE 6: Business Milestones ======================================
  console.log("DATABASE 6: Business Milestones");
  const milestoneId = await createDatabase("Business Milestones", "🎯", {
    Milestone: titleProp(),
    Status: selectProp([
      ["Achieved", "green"],
      ["In Progress", "yellow"],
      ["Not Started", "gray"],
    ]),
    Notes: textProp(),
  });
  const milestones = [
    ["Business becomes profitable", "Achieved", ""],
    ["£10,000 revenue", "In Progress", "Currently ~£6,000"],
    ["10,000 YouTube subscribers", "Not Started", ""],
    ["Earn more from business than medicine, ~£35-37k", "Not Started", ""],
    ["Self-sufficient business that runs without me", "Not Started", ""],
    ["£100,000 revenue", "Not Started", ""],
    ["Millionaire before 30", "Not Started", ""],
  ];
  for (const [milestone, status, notes] of milestones) {
    await addRow(milestoneId, {
      Milestone: title(milestone),
      Status: select(status),
      Notes: text(notes),
    });
  }
  console.log(`  ✓ ${milestones.length} entries added\n`);

  console.log("Done. All six databases rebuilt with colours and icons.");
  console.log(
    `Open your workspace: https://www.notion.so/${PARENT_PAGE_ID.replace(/-/g, "")}`
  );
}

main().catch((err) => {
  console.error("\nFAILED:", err.message);
  process.exit(1);
});
