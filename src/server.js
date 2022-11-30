import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb" }, { extended: true }));

viewEngine(app);
initWebRoutes(app);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
