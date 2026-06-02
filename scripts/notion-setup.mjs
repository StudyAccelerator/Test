#!/usr/bin/env node
/**
 * Builds the "A-Level Accelerators HQ" Notion workspace.
 *
 * Creates six databases under the parent page, pre-populates them with the
 * starting entries, and adds a navigation text block to the top of the page.
 *
 * Usage:
 *   NOTION_TOKEN=ntn_xxx NOTION_PARENT_PAGE_ID=<page-id> node scripts/notion-setup.mjs
 *
 * The parent page id defaults to the A-Level Accelerators HQ page if the
 * env var is omitted. The integration must be shared with that page first
 * (in Notion: ••• → Connections → add your integration).
 *
 * Requires Node 18+ (uses the built-in fetch). No external SDK needed.
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

// ---- small property helpers -------------------------------------------------
const title = (v) => ({ title: [{ text: { content: v } }] });
const text = (v) =>
  v ? { rich_text: [{ text: { content: v } }] } : { rich_text: [] };
const select = (v) => (v ? { select: { name: v } } : { select: null });
const date = (v) => (v ? { date: { start: v } } : { date: null });

const titleProp = () => ({ title: {} });
const textProp = () => ({ rich_text: {} });
const dateProp = () => ({ date: {} });
const selectProp = (options) => ({
  select: { options: options.map((name) => ({ name })) },
});

// Create a database under the parent page.
async function createDatabase(name, properties) {
  const db = await notion("databases", {
    parent: { type: "page_id", page_id: PARENT_PAGE_ID },
    title: [{ type: "text", text: { content: name } }],
    properties,
  });
  console.log(`  ✓ database created: ${name}`);
  return db.id;
}

// Add a row to a database.
async function addRow(databaseId, properties) {
  await notion("pages", {
    parent: { database_id: databaseId },
    properties,
  });
}

async function main() {
  console.log(`Building workspace under page ${PARENT_PAGE_ID}\n`);

  // === Navigation text block at the top of the parent page ===================
  // Appended first so it sits above the databases that get created afterwards.
  console.log("Adding navigation block to parent page...");
  await notion(`blocks/${PARENT_PAGE_ID}/children`, {
    children: [
      {
        object: "block",
        type: "heading_1",
        heading_1: { rich_text: [{ text: { content: "A-Level Accelerators HQ" } }] },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            { text: { content: "Your central command centre. The six databases below run the business:" } },
          ],
        },
      },
      bullet("Outreach Tracker", " — schools, resource platforms, tutoring platforms and communities to partner with, and where each conversation stands."),
      bullet("Task Board", " — every active task across the business with priority, owner and status."),
      bullet("Products and Pricing", " — the full product line-up with current pricing and live/planned status."),
      bullet("Funnels and Automations", " — email sequences, funnels and tracking, and whether each is live, draft or still to build."),
      bullet("Content Calendar", " — LinkedIn posts, Discord sessions, webinars and talks, planned and scheduled."),
      bullet("Business Milestones", " — the big revenue and growth goals and progress towards each."),
    ],
  }, "PATCH");
  console.log("  ✓ navigation block added\n");

  // === DATABASE 1: Outreach Tracker =========================================
  console.log("DATABASE 1: Outreach Tracker");
  const outreachId = await createDatabase("Outreach Tracker", {
    Name: titleProp(),
    Type: selectProp([
      "School",
      "Resource Platform",
      "Tutoring Platform",
      "YouTube Channel",
      "Community",
      "Resource Platform / YouTube",
    ]),
    "Contact Name": textProp(),
    "Contact Email or LinkedIn": textProp(),
    Status: selectProp([
      "Not Started",
      "Email Sent",
      "Followed Up",
      "Meeting Booked",
      "Partnership Live",
      "Declined",
    ]),
    "Date Contacted": dateProp(),
    Owner: selectProp(["Waleed", "Bathu", "Iana"]),
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
  const taskId = await createDatabase("Task Board", {
    Task: titleProp(),
    Category: selectProp([
      "Tracking",
      "Parent Funnel",
      "Audience Building",
      "Product",
      "Paid Ads",
      "GCSE",
      "Hiring",
    ]),
    Priority: selectProp(["Red", "Amber", "Green"]),
    Owner: selectProp(["Waleed", "Bathu", "Iana"]),
    Status: selectProp(["To Do", "In Progress", "Done"]),
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
  const productId = await createDatabase("Products and Pricing", {
    Product: titleProp(),
    Price: textProp(),
    Status: selectProp(["Live", "On Hold", "Planned", "Free Lead Magnet"]),
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
  const funnelId = await createDatabase("Funnels and Automations", {
    Name: titleProp(),
    Type: selectProp(["Email Automation", "Funnel", "Tracking"]),
    Status: selectProp(["Live", "Draft", "Not Built"]),
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
  const contentId = await createDatabase("Content Calendar", {
    Title: titleProp(),
    Type: selectProp([
      "LinkedIn Post",
      "Discord Session",
      "Parent Webinar",
      "Newsletter",
      "School Talk",
    ]),
    Date: dateProp(),
    Status: selectProp(["Idea", "Drafted", "Scheduled", "Published"]),
    Owner: selectProp(["Waleed", "Bathu", "Ianna"]),
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
  const milestoneId = await createDatabase("Business Milestones", {
    Milestone: titleProp(),
    Status: selectProp(["Achieved", "In Progress", "Not Started"]),
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

  console.log("Done. All six databases created and populated.");
  console.log(
    `Open your workspace: https://www.notion.so/${PARENT_PAGE_ID.replace(/-/g, "")}`
  );
}

function bullet(bold, rest) {
  return {
    object: "block",
    type: "bulleted_list_item",
    bulleted_list_item: {
      rich_text: [
        { text: { content: bold }, annotations: { bold: true } },
        { text: { content: rest } },
      ],
    },
  };
}

main().catch((err) => {
  console.error("\nFAILED:", err.message);
  process.exit(1);
});
