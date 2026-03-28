const puppeteer = require("puppeteer");
const ApiError = require("../../utils/ApiError");

const renderResumePdfFromHtml = async (html) => {
  if (!html || typeof html !== "string") {
    throw new ApiError(400, "Valid HTML is required to generate PDF");
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

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
