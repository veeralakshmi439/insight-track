// retrieveRecords.js
const db = require("../db");

async function retrieveRecords(fromTimestamp, toTimestamp, flow_name) {
  const client = await db.getClient();

  try {
    const queryWithOutFlowNameFilter = `
      SELECT id,scan_id,sequence_number,timestamp,start_uri,end_uri,screenshot_id,flow_name,status
      FROM SYNTHETIC_FLOWS
      WHERE (timestamp BETWEEN $1 AND $2)
      ORDER BY timestamp ASC
    `;

    const queryWithFlowNameFilter = `
    SELECT id,scan_id,sequence_number,timestamp,start_uri,end_uri,screenshot_id,flow_name,status
    FROM SYNTHETIC_FLOWS
    WHERE (timestamp BETWEEN $1 AND $2) AND flow_name = $3
    ORDER BY timestamp ASC
  `;

    const values = [fromTimestamp, toTimestamp];

    if (flow_name) {
      values.push(flow_name);
    }

    const query = flow_name
      ? queryWithFlowNameFilter
      : queryWithOutFlowNameFilter;

    const res = await client.query(query, values);
    return res.rows;
  } catch (err) {
    console.error("Error retrieving records:", err);
    throw err;
  } finally {
    client.release();
  }
}

async function retrieveRecordById(id) {
  const client = await db.getClient();

  try {
    const query = `
    SELECT *
    FROM SYNTHETIC_FLOWS
    WHERE id = $1
  `;

    const values = [id];

    const res = await client.query(query, values);
    return res.rows;
  } catch (err) {
    console.error("Error retrieving records:", err);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { retrieveRecords, retrieveRecordById };
