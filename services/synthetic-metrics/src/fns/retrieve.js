// retrieveRecords.js
const db = require('./db');

async function retrieveRecords(fromTimestamp, toTimestamp) {
  const client = await db.getClient();

  try {
    const query = `
      SELECT *
      FROM ChromePerformance
      WHERE timestamp BETWEEN $1 AND $2
      ORDER BY timestamp ASC
    `;
    const values = [fromTimestamp, toTimestamp];

    const res = await client.query(query, values);
    return res.rows;
  } catch (err) {
    console.error('Error retrieving records:', err);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = retrieveRecords;