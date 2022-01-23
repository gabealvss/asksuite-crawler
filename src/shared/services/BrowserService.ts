import Puppeteer, { Browser } from "puppeteer";

class BrowserService {
  async getBrowser(): Promise<Browser> {
    return Puppeteer.launch({});
  }

  async closeBrowser(browser: Browser): Promise<void> {
    if (!browser) return;

    await browser.close();
  }
}

export { BrowserService };
