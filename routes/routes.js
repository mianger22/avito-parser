import cors from "cors";
import bodyParser from "body-parser";
import { getApartmentsInfo } from "../Controllers/users.controllers";

export default function routes(app) {
  // настраиваем АПИ, чтобы не приходила ошибка CORS
  app.use(cors({ origin: true, credentials: true }));
  app.use(bodyParser.json());
  app.use(
      bodyParser.urlencoded({
          extended: true,
      })
  );

  app.get("/info", async function(_, res) {
    res.send(await getApartmentsInfo);
  });
};
