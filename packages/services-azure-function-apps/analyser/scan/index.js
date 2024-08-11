const { DefaultAzureCredential } = require("@azure/identity");
const { ServiceBusClient } = require("@azure/service-bus");
const { v4: uuid } = require("uuid");

module.exports = async function (context, req) {
  context.res = {
    status: 200,
    body: `scan info`,
  };
};
