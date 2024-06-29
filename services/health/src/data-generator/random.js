const db = require('../db');
const uuid=require('uuid');
// Flow names as shown in the screenshot
const flowNames = [
  'Beautypie Product Navigation',
  'Liddle Home',
  'Supredrug Home',
  'Boots Home',
  'Cineworld Home',
  'Tesco Store Home',
  'ASDA Groceries Home',
];

function getRandomStatus() {
  const statuses = ['up','up','up','up','up','up','up','up','up','up','up','up','up','up','up','up','up','up', 'down', 'partially up'];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

// Calculate the total number of records
const minutesIn90Days = 60;
const totalScans = flowNames.length * minutesIn90Days;

async function insertData() {
  const client = await db.getClient();
  try {
    await client.query('BEGIN');

    // Insert dummy screenshots
    const screenshotIds = [];
    for (let i = 0; i < 10; i++) {
      const res = await client.query(
        'INSERT INTO Screenshots (blob_storage) VALUES ($1) RETURNING id',
        [Buffer.from(`Screenshot data ${i}`, 'utf-8')]
      );
      screenshotIds.push(res.rows[0].id);
    }

    // Insert dummy ChromePerformance records
    const now = new Date();
    
    for (const flowName of flowNames) {
      for (let i = 0; i < minutesIn90Days; i++) {
        let scanId = uuid.v4();
        const timestamp = new Date(now.getTime() - i * 60 * 1000);
        const screenshotId = screenshotIds[i % screenshotIds.length];
        const traceJson = {};
        const harFile = {};
        const firstContentfulPaint = (Math.random() * (3.0 - 0.5) + 0.5).toFixed(2);
        const largestContentfulPaint = (Math.random() * (4.0 - 1.0) + 1.0).toFixed(2);
        const cumulativeLayoutShift = (Math.random() * (0.25 - 0.0) + 0.0).toFixed(2);
        const totalBlockingTime = Math.floor(Math.random() * 500);
        const status = getRandomStatus();

        await client.query(
          `INSERT INTO SYNTHETIC_FLOWS (
            scan_id, sequence_number, timestamp, start_uri, end_uri, trace_json, har_file, 
            first_contentful_paint, largest_contentful_paint, cumulative_layout_shift, 
            total_blocking_time, screenshot_id, flow_name,status
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,$14)`,
          [
            scanId,
            i,
            timestamp,
            `http://example.com/start/${scanId}`,
            `http://example.com/end/${scanId}`,
            traceJson,
            harFile,
            firstContentfulPaint,
            largestContentfulPaint,
            cumulativeLayoutShift,
            totalBlockingTime,
            screenshotId,
            flowName,
            status
          ]
        );
        console.log(scanId);
      }
    }

    await client.query('COMMIT');
    console.log(`Inserted ${totalScans} records.`);
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('Error inserting data:', e);
  } finally {
    client.release();
  }
}

module.exports = insertData;
