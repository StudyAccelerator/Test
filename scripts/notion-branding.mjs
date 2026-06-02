#!/usr/bin/env node
/**
 * Adds A-Level Accelerators branding + a photo to the Notion HQ page.
 *
 * Uploads local image files to Notion via the Direct File Upload API (the API
 * cannot reference local paths, only uploaded files or public URLs), then:
 *   - sets the page ICON to the "A" monogram logo
 *   - sets the page COVER to the horizontal logo lockup (a branded banner)
 *   - inserts the graduation photo as an image block near the top of the page
 *
 * Idempotent-ish: the cover/icon are simply overwritten each run; the photo is
 * only inserted if no image block already exists on the page.
 *
 * Usage:
 *   NOTION_TOKEN=ntn_xxx NOTION_PARENT_PAGE_ID=<page-id> node scripts/notion-branding.mjs
 *
 * Requires Node 18+ (built-in fetch, FormData, Blob).
 */

import { readFile } from "node:fs/promises";
import { basename } from "node:path";

const TOKEN = process.env.NOTION_TOKEN;
const PARENT_PAGE_ID =
  process.env.NOTION_PARENT_PAGE_ID || "37338ee471f880d2a290d560aecd3beb";
const NOTION_VERSION = "2022-06-28";
const ROOT = new URL("..", import.meta.url).pathname; // repo root

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

// Upload a local file to Notion and return the file_upload id.
async function uploadFile(relPath, contentType) {
  const name = basename(relPath);
  // 1) Create the file upload object.
  const created = await notion("file_uploads", {
    filename: name,
    content_type: contentType,
  });
  // 2) Send the bytes as multipart/form-data (let fetch set the boundary).
  const buf = await readFile(ROOT + relPath);
  const form = new FormData();
  form.append("file", new Blob([buf], { type: contentType }), name);
  const res = await fetch(
    `https://api.notion.com/v1/file_uploads/${created.id}/send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Notion-Version": NOTION_VERSION,
      },
      body: form,
    }
  );
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`upload send failed for ${name} (${res.status}): ${JSON.stringify(json)}`);
  }
  console.log(`  ✓ uploaded ${name} (${(buf.length / 1024).toFixed(0)} KB)`);
  return created.id;
}

async function main() {
  console.log(`Branding page ${PARENT_PAGE_ID}\n`);

  console.log("Uploading images...");
  const iconId = await uploadFile("No Title logo.png", "image/png");
  const coverId = await uploadFile("Untitled design (1).png", "image/png");
  const photoId = await uploadFile("Graduation .jpg", "image/jpeg");
  console.log("");

  // Cover (brand banner) + icon (monogram). File-upload icons aren't always
  // accepted, so fall back to setting just the cover if the combined patch fails.
  console.log("Setting page cover + icon...");
  try {
    await notion(
      `pages/${PARENT_PAGE_ID}`,
      {
        icon: { type: "file_upload", file_upload: { id: iconId } },
        cover: { type: "file_upload", file_upload: { id: coverId } },
      },
      "PATCH"
    );
    console.log("  ✓ cover (logo banner) and icon (monogram) set");
  } catch (e) {
    console.warn(`  ! combined patch failed (${e.message}); setting cover only and keeping emoji icon`);
    await notion(
      `pages/${PARENT_PAGE_ID}`,
      { cover: { type: "file_upload", file_upload: { id: coverId } } },
      "PATCH"
    );
    console.log("  ✓ cover (logo banner) set");
  }
  console.log("");

  // Insert the photo near the top — once — right after the callout banner.
  console.log("Inserting your photo...");
  const children = await notion(
    `blocks/${PARENT_PAGE_ID}/children?page_size=100`,
    null,
    "GET"
  );
  if (children.results.some((b) => b.type === "image")) {
    console.log("  image block already present — skipping insert.");
  } else {
    const callout = children.results.find((b) => b.type === "callout");
    const body = {
      children: [
        {
          object: "block",
          type: "image",
          image: {
            type: "file_upload",
            file_upload: { id: photoId },
            caption: [
              { text: { content: "Waleed — Founder, A-Level Accelerators" } },
            ],
          },
        },
      ],
    };
    if (callout) body.after = callout.id; // place near the top
    await notion(`blocks/${PARENT_PAGE_ID}/children`, body, "PATCH");
    console.log("  ✓ photo inserted near the top of the page");
  }

  console.log("\nDone. Branding applied.");
  console.log(
    `Open your workspace: https://www.notion.so/${PARENT_PAGE_ID.replace(/-/g, "")}`
  );
}

main().catch((err) => {
  console.error("\nFAILED:", err.message);
  process.exit(1);
});
