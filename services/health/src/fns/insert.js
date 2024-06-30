const fs = require("fs");
const cassandra = require("cassandra-driver");
const { v4: uuidv4 } = require('uuid');
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
    let screenshot;
    try {
      screenshot = fs.readFileSync(screenshotPath || "");
    } catch (error) {
      console.log(error);
      screenshot = null;
    }

    const screenshot_id = uuidv4();

  
    // Insert performance data into SYNTHETIC_FLOWS table
    const insertPerformanceQuery = `
      INSERT INTO flow_health (
        id, flow_name, status, scan_id, sequence_number, timestamp, start_uri, end_uri,
        trace_json, har_file, first_contentful_paint, largest_contentful_paint,
        cumulative_layout_shift, total_blocking_time, screenshot_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const performanceId = uuidv4();
    const values = [
      performanceId,
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

    await client.execute(insertPerformanceQuery, values, { prepare: true });

    console.log('Data inserted successfully');
  } catch (e) {
    console.error('Error inserting data:', e);
    throw e;
  } finally {
    await client.shutdown();
  }
}

module.exports = insertRecord;
