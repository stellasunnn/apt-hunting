import { defineConfig } from "drizzle-kit";

require('dotenv').config()

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema.js',
  dbCredentials: {
    url: process.env.PSQL
  },
})