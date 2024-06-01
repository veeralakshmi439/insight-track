const fs = require('fs');
const db = require('../db');

const staticHar = {
  log: {
    version: "1.2",
    creator: { name: "WebInspector", version: "537.36" },
    pages: [],
    entries: []
  }
};

const staticPerformance = {
  first_contentful_paint: 1.5,
  largest_contentful_paint: 2.5,
  cumulative_layout_shift: 0.1,
  total_blocking_time: 200
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTimestamp() {
  const start = new Date(2023, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomUri() {
  const uris = [
    'http://example.com/start',
    'http://example.org/start',
    'http://test.com/start',
    'http://demo.com/start'
  ];
  return uris[Math.floor(Math.random() * uris.length)];
}

function getRandomSequenceNumber() {
  return getRandomInt(1, 100);
}

function getRandomScanId() {
  return getRandomInt(1, 10);
}

async function insertRandomRecord() {
  const client = await db.getClient();

  try {
    await client.query('BEGIN');

    const screenshotPath = './screenshot.png'; // Adjust the path to an actual file path
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
      getRandomScanId(), // scanId
      getRandomSequenceNumber(), // sequenceNumber
      getRandomTimestamp(), // timestamp
      getRandomUri(), // startUri
      getRandomUri(), // endUri
      staticHar, // traceJson
      staticHar, // harFile
      staticPerformance.first_contentful_paint, // fcp
      staticPerformance.largest_contentful_paint, // lcp
      staticPerformance.cumulative_layout_shift, // cls
      staticPerformance.total_blocking_time, // tbt
      screenshotId // screenshotId
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

module.exports = insertRandomRecord;
