const { TableClient } = require("@azure/data-tables");
const { runBrowser } = require("./runbrowser");

module.exports = async function (context, myTimer) {
  context.log.info("connecting to table storage");
  const connectionString = process.env.STORAGE_ACCOUNT_CONNECTION_STRING;
  const tableName = "applications";
  let tableClient = null;
  try {
    tableClient = TableClient.fromConnectionString(connectionString, tableName);
    context.log.info("connected to table storage");
  } catch (error) {
    context.log.error("Error connecting to tabel storage", error);
  }
  try {
    // Define a query to find the oldest date
    let minDateEntity = null;
    const entitiesIter = tableClient.listEntities({
      queryOptions: { filter: "PartitionKey eq '1'" },
    });

    for await (const entity of entitiesIter) {
      if (!minDateEntity || entity.date < minDateEntity.date) {
        minDateEntity = entity;
      }
    }

    if (minDateEntity) {
      context.log.info("Processing entity with RowKey:", minDateEntity.RowKey);

      // Process the data here, example: logging
      context.log.info("Data:", minDateEntity);
      await runBrowser(context, minDateEntity);
      
      // Update the date to the current date-time
      minDateEntity.date = new Date().toISOString();

      await tableClient.updateEntity(minDateEntity, "Replace");

      context.log.info("Row updated successfully");
    } else {
      context.log.error("No entity found");
    }
  } catch (error) {
    context.log.error("Error:", error.message);
  }
};

