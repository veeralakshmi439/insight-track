const { DefaultAzureCredential } = require("@azure/identity");
const { ServiceBusClient } = require("@azure/service-bus");
const { v4 : uuid } = require('uuid');

module.exports = async function (context, req) {
  context.log("HTTP trigger function processed a request.");

  // Name of the Service Bus namespace
  const fullyQualifiedNamespace = process.env["SERVICEBUS_NAMESPACE"];
  // Name of the queue
  const queueName = process.env["SERVICEBUS_QUEUE_NAME"];

  // Create a Service Bus client using the DefaultAzureCredential, which will use the Managed Identity
  const credential = new DefaultAzureCredential();
  const sbClient = new ServiceBusClient(fullyQualifiedNamespace, credential);
  const sender = sbClient.createSender(queueName);

  try {
    // The message to send to the queue
    const message = {
      body: {
        id: uuid(),
        url: "https://www.googe.com",
      },
      label: "Default label",
    };

    // Send the message to the queue
    await sender.sendMessages(message);
    context.log(`Message sent to queue: ${queueName}`);
    context.res = {
      body: message,
    };
  } catch (err) {
    context.log.error(`Error sending message to queue: ${err.message}`);
    context.res = {
      status: 500,
      body: `Error sending message to queue: ${err.message}`,
    };
  } finally {
    // Close the sender
    await sender.close();
    // Close the Service Bus client
    await sbClient.close();
  }
};
