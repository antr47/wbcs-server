import * as tf from "@tensorflow/tfjs-node";
tf.setBackend("tensorflow");
let handleGetPredictService = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputData.image) {
        resolve({
          errCode: 1,
          errMessage: "Missing data",
        });
      } else {
        let img = inputData.image.replace(
          /^data:image\/(png|jpeg);base64,/,
          ""
        );
        let b = Buffer.from(img, "base64");
        let tensor = tf.node.decodeImage(b, 3);
        let casted = tensor.cast("int32");
        let expanded = casted.expandDims(0);
        console.log(expanded.shape);

        // get the tensor
        let model = await tf.loadGraphModel(
          "https://raw.githubusercontent.com/antr47/SSD-MobileNetV2/master/model.json"
        );
        model.executeAsync(expanded).then(async (predictions) => {
          const boxes = predictions[2].arraySync();
          const scores = predictions[5].arraySync();
          const classes = predictions[7].dataSync();

          resolve({
            errCode: 0,
            errMessage: "Successfully",
            data: {
              boxes: boxes[0],
              classes: classes,
              scores: scores[0],
            },
          });
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = {
  handleGetPredictService,
};
