const { QueueServiceClient } = require("@azure/storage-queue");

// Function to push a message to the queue
async function pushMessageToQueue(message) {
  const connectionString = process.env.QUEUE_CONNECTION_NAME;
  const queueName = process.env.QUEUE_NAME;
  // Initialize the QueueServiceClient
  const queueServiceClient =
    QueueServiceClient.fromConnectionString(connectionString);

  // Get the QueueClient
  const queueClient = queueServiceClient.getQueueClient(queueName);

  // Ensure the queue is created
  await queueClient.createIfNotExists();

  try {
    // Send the message
    const enqueueResponse = await queueClient.sendMessage(message);
    console.log(
      `Message '${message}' has been pushed to the queue. Message ID: ${enqueueResponse.messageId}`
    );
  } catch (error) {
    console.error("Error pushing message to queue: ", error);
  }
}

module.exports = pushMessageToQueue;
