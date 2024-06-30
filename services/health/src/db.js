const cassandra = require("cassandra-driver");

// Environment variables
const username = process.env.AZURE_COSMOS_USERNAME;
const password = process.env.AZURE_COSMOS_PASSWORD;
const contactPoint = process.env.AZURE_COSMOS_CONTACTPOINT;
const port = process.env.AZURE_COSMOS_PORT || 10350;
const keyspace = process.env.AZURE_COSMOS_KEYSPACE;
const localDataCenter = process.env.AZURE_COSMOS_REGION;

async function getClient() {
  const authProvider = new cassandra.auth.PlainTextAuthProvider(
    username, // Cosmos DB username
    password // Cosmos DB primary key
  );

  const client = new cassandra.Client({
    contactPoints: [`${contactPoint}:${port}`],
    localDataCenter: localDataCenter,
    keyspace: keyspace,
    authProvider: authProvider,
    sslOptions: {
      secureProtocol: "TLSv1_2_method",
    },
  });

  await client.connect();

  return client;
}

module.exports = {
  getClient,
};
