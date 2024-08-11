const { getClient } = require("../db");

async function retrieveRecords(fromTimestamp, toTimestamp, flow_name) {
  const client = await getClient();

  try {
    // Note: Cassandra requires you to include the primary key in the WHERE clause.
    // Assuming `timestamp` is part of the primary key or indexed appropriately.
    const queryWithOutFlowNameFilter = `
      SELECT id, scan_id, sequence_number, timestamp, start_uri, end_uri, screenshot_id, flow_name, status
      FROM flow_health
      WHERE timestamp >= ? AND timestamp <= ?
      ALLOW FILTERING
    `;

    const queryWithFlowNameFilter = `
      SELECT id, scan_id, sequence_number, timestamp, start_uri, end_uri, screenshot_id, flow_name, status
      FROM flow_health
      WHERE timestamp >= ? AND timestamp <= ? AND flow_name = ?
      ALLOW FILTERING
    `;

    const values = [fromTimestamp, toTimestamp];

    if (flow_name) {
      values.push(flow_name);
    }

    const query = flow_name
      ? queryWithFlowNameFilter
      : queryWithOutFlowNameFilter;

    const res = await client.execute(query, values, { prepare: true });

    return res.rows.map((row) => ({
      ...row,
      timeBucket: roundTimestampToFiveMinutes(row.timestamp),
    }));

  } catch (err) {
    console.error("Error retrieving records:", err);
    throw err;
  } finally {
    await client.shutdown();
  }
}

async function retrieveRecordById(id) {
  const client = await getClient();

  try {
    const query = `
      SELECT *
      FROM synthetic_flows
      WHERE id = ?
    `;

    const values = [id];

    const res = await client.execute(query, values, { prepare: true });
    return res.rows;
  } catch (err) {
    console.error("Error retrieving record by ID:", err);
    throw err;
  } finally {
    await client.shutdown();
  }
}

function roundTimestampToFiveMinutes(timestamp) {
  const date = new Date(timestamp);
  const minutes = 10;
  const ms = 1000 * 60 * minutes;
  return new Date(Math.floor(date.getTime() / ms) * ms);
}

module.exports = { retrieveRecords, retrieveRecordById };
