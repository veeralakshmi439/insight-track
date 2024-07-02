const puppeteer = require("puppeteer").default;
const cp = require("child_process");
const { uploadImageToBlobStorage } = require("./upload-screenshot");
const path = require("path");
const { v4: uuid } = require("uuid");
const pushMessageToQueue = require('./postMessage');

const runBrowser = async (context, applicationPage) => {
  try {
    context.log.info("Browser launching");
    let flowStatus = "up";
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
      headless: "new",
      defaultViewport: null,
    });

    context.log.info("Browser launched");

    const page = await browser.newPage();
    await page.setViewport({
      width: 1680,
      height: 1050,
      deviceScaleFactor: 1,
    });
    context.log.info("page launched");

    // Navigate the page to a URL
    try {
      const HTTPResponse = await page.goto(applicationPage.URL);
      flowStatus = HTTPResponse.status >= 400 ? "down" : "up";
    } catch (error) {
      context.log.error("Closeing browser because this error", error);
      flowStatus = "down";
      return await browser.close();
    }
    context.log.info("Page navigated");

    const screenShotDiskPath =
      path.resolve(
        __dirname,
        applicationPage?.name?.replace(/ /g, "-").toLowerCase() +
          "-" +
          new Date().toISOString()
      ) + ".jpg";

    await page.screenshot({
      path: path.resolve(__dirname, screenShotDiskPath),
      type: "jpeg",
      quality: 80,
    });

    try {
      const paintMetrics = await page.evaluate(`
       const metrics = performance.getEntriesByType('paint');
       metrics.map(metric => ({
         name: metric.name,
         value: metric.startTime
       }))
    `);

      paintMetrics?.forEach(async (metric) => {
        context.log.info(metric);
      });

      const { insertRecords } = require("@insight-track/health");

      await insertRecords({
        scan_id: uuid(),
        flow_name: applicationPage?.name,
        status: "up",
        sequence_number: 1,
        timestamp: new Date().toISOString(),
        start_uri: applicationPage?.URL,
        end_uri: applicationPage.URL,
        trace_json: "{}",
        har_file: "{}",
        first_contentful_paint: 1,
        largest_contentful_paint: 1,
        cumulative_layout_shift: 1,
        total_blocking_time: 1,
        screenshotPath: screenShotDiskPath,
      });


    } catch (error) {
      context.log.error("Error during metrics collection", error);
    }

    const blobUrl = await uploadImageToBlobStorage(context, screenShotDiskPath);

    await pushMessageToQueue(
      JSON.stringify({
        currentScan: {
          screenshotPath: blobUrl,
        },
        previousScan: {
          screenshotPath: blobUrl
        },
      })
    );

    await browser.close();
  } catch (error) {
    context.log.error("Error");
    context.log.error("Error: " + error);
    try {
      context.log.info("installing chrome");
      cp.execSync("npm install", { cwd: "/home/site/wwwroot/" });
    } catch (error) {
      context.log.error(error.toString());
    }
  } finally {
  }
};

module.exports = {
  runBrowser,
};
