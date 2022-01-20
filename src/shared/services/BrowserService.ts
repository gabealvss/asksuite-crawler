import { Browser, launch } from "puppeteer";

class BrowserService {
  static async getBrowser(): Promise<BrowserService> {
    return launch({});
  }

  static async closeBrowser(browser: Browser): Promise<void> {
    if (!browser) return;

    await browser.close();
  }
}

export { BrowserService };
