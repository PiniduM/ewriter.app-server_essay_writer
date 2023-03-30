import express, { json } from "express";
import cors from "cors";

import nonPremiumRouter from "./nonPremiumRoutes/nonPremiumRouter.js";

const server = express();

const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN,
  methods: ["POST"],
};

server.use(cors(corsOptions));

server.use((req, res, next) => {
  if (req.headers["content-legth"] === "67") next();
  else res.status(500).send("unauthorized_access");
});
server.use(json());

server.use("/nonpremium", nonPremiumRouter);

server.listen(5003, () => console.log("listening to port:5003"));
