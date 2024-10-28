import { defineConfig } from "drizzle-kit";
export default {
    //   out: "./drizzle",
    dialect: "postgresql",
    schema: "./utils/schema.js",
    //   driver: "pglite",
    dbCredentials: {
        url: "postgresql://neondb_owner:KDCgb71ZhlWF@ep-plain-bar-a8bq5d51.eastus2.azure.neon.tech/ai-mock-interviewer?sslmode=require",
    }
};
