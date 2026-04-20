const { Supernova } = require("@supernovaio/sdk");
const { randomUUID } = require("crypto");

const API_KEY = process.env.SUPERNOVA_API_KEY;
const DESIGN_SYSTEM_ID = "764138";
const VERSION_ID = "803332";
const PAGE_PERSISTENT_ID = "3e25c645-17ed-4a41-b4f3-05c50aede91e";

// Helper to build a text block
function textBlock(text) {
  return {
    type: "Block",
    id: randomUUID(),
    data: {
      packageId: "Text",
      indentLevel: 0,
      items: [
        {
          type: "Text",
          id: randomUUID(),
          props: {},
          data: {
            text: { spans: [{ text, attributes: [] }] },
          },
        },
      ],
    },
  };
}

// Helper to build a heading block (level 1 or 2)
function headingBlock(text, level = 1) {
  return {
    type: "Block",
    id: randomUUID(),
    data: {
      packageId: "Heading",
      indentLevel: 0,
      items: [
        {
          type: "Heading",
          id: randomUUID(),
          props: {},
          data: {
            headingType: level,
            text: { spans: [{ text, attributes: [] }] },
          },
        },
      ],
    },
  };
}

// Helper to build a divider
function dividerBlock() {
  return {
    type: "Block",
    id: randomUUID(),
    data: { packageId: "Divider", indentLevel: 0, items: [] },
  };
}

// Helper to build a callout block
function calloutBlock(text, calloutType = "Info") {
  return {
    type: "Block",
    id: randomUUID(),
    data: {
      packageId: "Callout",
      indentLevel: 0,
      items: [
        {
          type: "Callout",
          id: randomUUID(),
          props: {},
          data: {
            calloutType,
            text: { spans: [{ text, attributes: [] }] },
          },
        },
      ],
    },
  };
}

async function main() {
  const sdk = new Supernova(API_KEY, { bypassEnvFetching: true });

  const blocks = [
    calloutBlock(
      "Welcome to the Pepper Design System — Pepperstone's single source of truth for design and code.",
      "Success"
    ),
    dividerBlock(),

    headingBlock("What is the Pepper Design System?", 1),
    textBlock(
      "The Pepper Design System is a shared library of UI components, design tokens, patterns, and guidelines used across Pepperstone's product suite. It ensures consistency, accelerates development, and helps design and engineering teams speak the same language."
    ),

    dividerBlock(),

    headingBlock("What's inside", 2),
    textBlock(
      "🎨  Foundations — Core design tokens including colour, typography, spacing, border radius, and elevation."
    ),
    textBlock(
      "🧩  Components — Reusable UI components with documented usage, variants, and code examples."
    ),
    textBlock(
      "📐  Patterns — Common interaction patterns and page layouts that combine multiple components."
    ),
    textBlock(
      "✅  Guidelines — Accessibility, writing style, and usage guidance to ensure quality and consistency."
    ),

    dividerBlock(),

    headingBlock("Getting started", 2),
    textBlock(
      "If you're a designer, start in Figma — all Pepper components and tokens are available in the shared Figma library. If you're an engineer, install the component package and refer to the code documentation for each component."
    ),

    dividerBlock(),

    calloutBlock(
      "Have feedback or want to contribute? Reach out to the Design System team on Slack at #design-system.",
      "Info"
    ),
  ];

  console.log(`Writing ${blocks.length} blocks to "Claude Test Page"...`);

  const response = await sdk.documentation.elementAction(
    { designSystemId: DESIGN_SYSTEM_ID, versionId: VERSION_ID },
    {
      type: "DocumentationPageUpdateDocument",
      input: {
        id: PAGE_PERSISTENT_ID,
        documentItems: blocks,
      },
    }
  );

  if (response?.output?.success) {
    console.log("✅ Welcome content written successfully!");
    console.log('   Check "Claude Test Page" in your Supernova portal.');
  } else {
    console.log("Response:", JSON.stringify(response, null, 2));
  }
}

main().catch((err) => {
  console.error("Error:", err.message || err);
  process.exit(1);
});
