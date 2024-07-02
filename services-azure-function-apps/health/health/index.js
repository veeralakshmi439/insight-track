const { app } = require("@azure/functions");
const { retreveals, resetRoutes } = require("@insight-track/health");

const express = require("express");

const expressApp = express();

expressApp.use(resetRoutes);

async function status(req, context) {
  context.log("Hello");
  context.log(JSON.stringify(req));
  context.log(JSON.stringify(context));

  const urlObj = new URL(req.url);

  // Extract the search parameters
  const params = urlObj.searchParams;

  const from = params.get("from");
  const to = params.get("to");

  const fromTimestamp =
    from || new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString();
  const toTimestamp = to || new Date(to || new Date().toISOString());

  return {
    status: 200,
    jsonBody: await retreveals.retrieveRecords(fromTimestamp, toTimestamp),
  };
}

app.http("health", {
  route: "health",
  methods: ["GET"],
  authLevel: "anonymous",
  handler: status,
});

module.exports = status;
