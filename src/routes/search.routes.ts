import { Router } from "express";

import { SearchQuotationController } from "@modules/search/controllers/SearchQuotationController";

const searchRouter = Router();

searchRouter.post("/", new SearchQuotationController().handle);

export default searchRouter;
