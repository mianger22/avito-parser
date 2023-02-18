import { log } from "console";
import express from "express";
import http from "http";
import routes from "./routes/routes";

const app = express();
const httpServ = http.Server(app);
const port = process.env.PORT || 5000;

httpServ.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    log(`Cервер запущен`);
});

routes(app);