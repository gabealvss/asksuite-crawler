import { Request, Response } from "express";
import { container } from "tsyringe";

import { SearchQuotationUseCase } from "../useCases/SearchQuotationUseCase";

class SearchQuotationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { checkin, checkout } = request.body;

    if (!checkin || !checkout) {
      return response.status(400).json({ message: "Invalid params." });
    }

    const searchQuotationUseCase = container.resolve(SearchQuotationUseCase);
    const result = await searchQuotationUseCase.execute({
      checkin,
      checkout,
    });

    return response.status(200).json(result);
  }
}

export { SearchQuotationController };
