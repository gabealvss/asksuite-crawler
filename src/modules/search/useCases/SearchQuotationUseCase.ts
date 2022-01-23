import { injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import RoomResult from "@modules/@types/RoomResult";
import { BrowserService } from "@shared/services/BrowserService";

interface IRequest {
  checkin: string;
  checkout: string;
}

interface IResponse {
  rooms: RoomResult[];
}

@injectable()
class SearchQuotationUseCase {
  private browserService: BrowserService;

  constructor() {
    this.browserService = new BrowserService();
  }

  async execute({ checkin, checkout }: IRequest): Promise<IResponse> {
    const browser = await this.browserService.getBrowser();
    const page = await browser.newPage();

    await page.goto(`https://book.omnibees.com/hotelresults?CheckIn=${checkin}&CheckOut=${checkout}&Code=AMIGODODANIEL&NRooms=1&_askSI=d34b1c89-78d2-45f3-81ac-4af2c3edb220&ad=2&ag=-&c=2983&ch=0&diff=false&group_code=&lang=pt-BR&loyality_card=&utm_source=asksuite&q=5462#show-more-hotel-button
    `);
    const rooms = await page.$$(".roomrate.box-sh.border-unset:not(.d-none)");

    if (rooms.length === 0) {
      throw new AppError(
        "There are no results available for your search criteria.",
        404
      );
    }

    const results: RoomResult[] = await Promise.all(
      rooms.map(async (room) => {
        return {
          name: (
            await room.$eval(".hotel_name", (node) => node.textContent)
          ).replace(/(\r\n|\n|\r)/gm, ""),
          description: (
            await room.$eval(".hotel-description", (node) => node.textContent)
          ).replace(/(\r\n|\n|\r)/gm, ""),
          price: (
            await room.$eval(".price-total", (node) => node.textContent)
          ).replace(/(\r\n|\n|\r)/gm, ""),
          image: await room.$eval(".image-step2", (node) =>
            node.getAttribute("src")
          ),
        };
      })
    );

    return {
      rooms: results,
    };
  }
}

export { SearchQuotationUseCase };
