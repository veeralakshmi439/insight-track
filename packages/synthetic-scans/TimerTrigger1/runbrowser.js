const puppeteer = require("puppeteer").default;
const cp = require("child_process");
const { uploadImageToBlobStorage } = require("./upload-screenshot");
const { uploadHARToBlobStorage } = require("./upload-har");

const path = require("path");
const { v4: uuid } = require("uuid");
const pushMessageToQueue = require("./postMessage");
const PuppeteerHar = require("puppeteer-har");

const runBrowser = async (context, applicationPage) => {
  const ScanStartTime = new Date().toISOString();
  const filePathPrefix = `${applicationPage.name}-${ScanStartTime}`;
  const harPath = path.resolve(`${filePathPrefix}-browser-network.har`);
  const screenShotDiskPath = path.resolve(`${filePathPrefix}-screenshot.jpg`);

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
    const har = new PuppeteerHar(page);

    await har.start({ path: `${harPath}` });

    try {
      const HTTPResponse = await page.goto(applicationPage.URL);
      flowStatus = HTTPResponse.status >= 400 ? "down" : "up";
    } catch (error) {
      context.log.error("Closeing browser because this error", error);
      flowStatus = "down";
      await browser.close();
    }

    const { insertRecords } = require("@insight-track/health");

    await insertRecords({
      scan_id: uuid(),
      flow_name: applicationPage?.name,
      status: flowStatus,
      sequence_number: 1,
      timestamp: new Date().toISOString(),
      start_uri: applicationPage?.URL,
      end_uri: applicationPage.URL,
      trace_json: "{}",
      har_file: harPath,
      first_contentful_paint: 1,
      largest_contentful_paint: 1,
      cumulative_layout_shift: 1,
      total_blocking_time: 1,
      screenshotPath: screenShotDiskPath,
    });

    await page.waitForNetworkIdle();

    await har.stop();

    context.log.info("Page navigated");


    await page.screenshot({
      path: path.resolve(__dirname, screenShotDiskPath),
      type: "jpeg",
      quality: 80,
    });

    try {
      //   const paintMetrics = await page.evaluate(`
      //    const metrics = performance.getEntriesByType('paint');
      //    metrics.map(metric => ({
      //      name: metric.name,
      //      value: metric.startTime
      //    }))
      // `);
      //   paintMetrics?.forEach(async (metric) => {
      //     context.log.info(metric);
      //   });
    } catch (error) {
      context.log.error("Error during metrics collection", error);
    }

    const blobUrl = await uploadImageToBlobStorage(context, screenShotDiskPath);
    const harfile = await uploadHARToBlobStorage(context, harPath);

    await pushMessageToQueue(
      JSON.stringify({
        currentScan: {
          screenshotPath: blobUrl,
          harfile,
        },
        previousScan: {
          screenshotPath: blobUrl.replace(
            /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/g,
            applicationPage.timestamp
          ),
          harfile,
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
