import express,{json} from "express";
import cors from "cors";


import nonPremiumRouter from "./nonPremiumRoutes/nonPremiumRouter.js";


const server = express();


server.use(cors());
server.use(json());

server.use("/nonpremium",nonPremiumRouter);





server.listen(5003,() => console.log("listening to port:5003"));