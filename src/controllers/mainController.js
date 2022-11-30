import * as mainService from "../services/mainService";

const handleGetPredict = async (req, res) => {
  try {
    let respone = await mainService.handleGetPredictService(req.body);
    return res.status(200).json(respone);
  } catch (err) {
    console.error(err);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  handleGetPredict: handleGetPredict,
};
