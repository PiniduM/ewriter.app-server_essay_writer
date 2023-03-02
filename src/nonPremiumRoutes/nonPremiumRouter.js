import { Router } from "express";
import pointsProvider from "./givePoints/PointsProvider.js";
import essayProvider from "./writeAEssay/essayProvider.js";
const nonPremiumRouter = Router();

nonPremiumRouter.post("/write_a_essay", (req, res) => essayProvider(req,res));
nonPremiumRouter.post("/givepoints", (req, res) => pointsProvider(req,res));

export default nonPremiumRouter;
