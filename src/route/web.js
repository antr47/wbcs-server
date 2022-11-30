import express from "express";
import mainController from "../controllers/mainController";
let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.send("Hello World!");
  });

  router.post("/api/send-data", mainController.handleGetPredict);

  return app.use("/", router);
};
module.exports = initWebRoutes;
