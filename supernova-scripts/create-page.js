const { Supernova } = require("@supernovaio/sdk");

const API_KEY = process.env.SUPERNOVA_API_KEY;
const DESIGN_SYSTEM_ID = "764138";
const VERSION_ID = "803332";
const ROOT_GROUP_PERSISTENT_ID = "9b865d29-2c54-4c57-b92a-0f00fdf67a87";

async function main() {
  const sdk = new Supernova(API_KEY, { bypassEnvFetching: true });

  console.log("Creating new documentation page...");

  const newPage = await sdk.documentation.createDocumentationPage(
    { designSystemId: DESIGN_SYSTEM_ID, versionId: VERSION_ID },
    {
      title: "Claude Test Page",
      parentGroupPersistentId: ROOT_GROUP_PERSISTENT_ID,
    }
  );

  console.log("✅ Page created successfully!");
  console.log(`   Title: ${newPage.title}`);
  console.log(`   ID: ${newPage.id}`);
  console.log(`   Path: ${newPage.path}`);
}

main().catch((err) => {
  console.error("Error:", err.message || err);
  process.exit(1);
});
