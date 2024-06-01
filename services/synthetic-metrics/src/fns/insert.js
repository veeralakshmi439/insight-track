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
