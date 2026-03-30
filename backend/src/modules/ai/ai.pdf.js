const puppeteer = require("puppeteer");
const ApiError = require("../../utils/ApiError");

const BLOCKED_TAG_PATTERN = /<(script|iframe|frame|object|embed|link|meta)\b/gi;
const EXTERNAL_RESOURCE_PATTERN = /\b(src|href)\s*=\s*["']\s*(https?:|\/\/|data:text\/html)/gi;

const sanitizeHtml = (html) => {
  if (BLOCKED_TAG_PATTERN.test(html) || EXTERNAL_RESOURCE_PATTERN.test(html)) {
    throw new ApiError(400, "Generated HTML contains unsupported active or external content");
  }

  return html;
};

const renderResumePdfFromHtml = async (html) => {
  if (!html || typeof html !== "string") {
    throw new ApiError(400, "Valid HTML is required to generate PDF");
  }

  const safeHtml = sanitizeHtml(html);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setJavaScriptEnabled(false);
    await page.setRequestInterception(true);

    page.on("request", (request) => {
      const url = request.url();

      if (url === "about:blank") {
        request.continue();
        return;
      }

      request.abort();
    });

    await page.setContent(safeHtml, { waitUntil: "domcontentloaded" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "16mm",
        right: "12mm",
        bottom: "16mm",
        left: "12mm",
      },
    });

    return pdfBuffer;
  } catch (error) {
    throw new ApiError(500, "Failed to generate PDF from HTML", [error.message]);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = {
  renderResumePdfFromHtml,
};
