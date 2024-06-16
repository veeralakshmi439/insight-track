// insertRecord.js
const fs = require("fs");
const db = require("../db");

async function insertRecord(healthreceive) {
  const {
    scan_id,
    flow_name,
    status,
    sequence_number,
    timestamp,
    start_uri,
    end_uri,
    trace_json,
    har_file,
    first_contentful_paint,
    largest_contentful_paint,
    cumulative_layout_shift,
    total_blocking_time,
    screenshotPath,
  } = healthreceive;
  const client = await db.getClient();

  try {
    await client.query("BEGIN");
    let screenshot;
    try {
      screenshot = fs.readFileSync(screenshotPath || "");
    } catch (error) {
      console.log(error);
      screenshot = "";
    }

    const insertScreenshotQuery = `
      INSERT INTO Screenshots (blob_storage)
      VALUES ($1)
      RETURNING id
    `;
    const resScreenshot = await client.query(insertScreenshotQuery, [
      screenshot,
    ]);
    const screenshot_id = resScreenshot.rows[0].id;

    const insertPerformanceQuery = `
      INSERT INTO SYNTHETIC_FLOWS (
        flow_name,status,scan_id, sequence_number, timestamp, start_uri, end_uri,
        trace_json, har_file, first_contentful_paint, largest_contentful_paint,
        cumulative_layout_shift, total_blocking_time, screenshot_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,$13,$14)
    `;

    const values = [
      flow_name,
      status,
      scan_id,
      sequence_number,
      timestamp,
      start_uri,
      end_uri,
      trace_json,
      har_file,
      first_contentful_paint,
      largest_contentful_paint,
      cumulative_layout_shift,
      total_blocking_time,
      screenshot_id,
    ];

    await client.query(insertPerformanceQuery, values);

    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

module.exports = insertRecord;
