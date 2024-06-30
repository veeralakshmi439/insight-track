const { app } = require("@azure/functions");
const { retreveals,resetRoutes } = require("@insight-track/health");

const express = require('express');

const expressApp = express();

expressApp.use(resetRoutes);


async function status(req, context) {
  context.log('Hello');
  context.log(JSON.stringify(req));
  context.log(JSON.stringify(context));

  const { from, to, flow_name } = req.params;

  const fromTimestamp = new Date(new Date().getTime() - (24 * 60 * 60 * 1000)).toISOString();
  const toTimestamp = new Date(to || new Date().toISOString());

  return {
    status: 200,
    jsonBody: await retreveals.retrieveRecords(fromTimestamp,toTimestamp)
  };
}

app.http("health", {
  route: "health",
  methods: ["GET"],
  authLevel: "anonymous",
  handler: status,
});

module.exports = status;
