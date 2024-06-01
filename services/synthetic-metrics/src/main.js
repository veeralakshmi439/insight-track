// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'your-username',
  host: 'your-host',
  database: 'your-database',
  password: 'your-password',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
};
Step 3: Create a Function to Insert a Record
Create a file named insertRecord.js and define the function to insert a record into the database.

javascript
Copy code
// insertRecord.js
const fs = require('fs');
const db = require('./db');

async function insertRecord(scanId, sequenceNumber, timestamp, startUri, endUri, traceJson, harFile, fcp, lcp, cls, tbt, screenshotPath) {
  const client = await db.getClient();

  try {
    await client.query('BEGIN');

    const screenshot = fs.readFileSync(screenshotPath);

    const insertScreenshotQuery = `
      INSERT INTO Screenshots (blob_storage)
      VALUES ($1)
      RETURNING id
    `;
    const resScreenshot = await client.query(insertScreenshotQuery, [screenshot]);
    const screenshotId = resScreenshot.rows[0].id;

    const insertPerformanceQuery = `
      INSERT INTO ChromePerformance (
        scan_id, sequence_number, timestamp, start_uri, end_uri,
        trace_json, har_file, first_contentful_paint, largest_contentful_paint,
        cumulative_layout_shift, total_blocking_time, screenshot_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `;

    const values = [
      scanId, sequenceNumber, timestamp, startUri, endUri,
      traceJson, harFile, fcp, lcp, cls, tbt, screenshotId
    ];

    await client.query(insertPerformanceQuery, values);

    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

module.exports = insertRecord;
Step 4: Use the Insert Function
Create a file named main.js to use the insert function and handle any necessary operations.

javascript
Copy code
// main.js
const insertRecord = require('./insertRecord');

const main = async () => {
  try {
    await insertRecord(
      1, // scanId
      1, // sequenceNumber
      new Date(), // timestamp
      'http://start-uri.com', // startUri
      'http://end-uri.com', // endUri
      { /* traceJson */ }, // traceJson
      { /* harFile */ }, // harFile
      1.5, // fcp
      2.5, // lcp
      0.1, // cls
      200, // tbt
      './path/to/screenshot.png' // screenshotPath
    );
    console.log('Record inserted successfully');
  } catch (err) {
    console.error('Error inserting record:', err);
  }
};

main();
