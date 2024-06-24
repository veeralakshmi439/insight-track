const { app } = require("@azure/functions");
const { generateRandomData,router } = require("@repo/synthetic-metrics");

const express = require('express');

const expressApp = express();

expressApp.use(router);


async function status(request, context) {
  context.log(`Http function processed request for url "${request.url}"`);

  return {
    status: 200,
    jsonBody: generateRandomData('2022-09-27T18:00:00.000','2022-09-27T18:00:00.000')
  };
}

app.http("health", {
  route: "health",
  methods: ["GET"],
  authLevel: "anonymous",
  handler: status,
});

module.exports = status;
