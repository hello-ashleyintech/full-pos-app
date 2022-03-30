var express = require("express");
require("dotenv").config();
var router = express.Router();
const { Serialized } = require("@serialized/serialized-client");
const ProjectionsClient = require("../projections");

const serializedClient = Serialized.create({
  accessKey: process.env.SERIALIZED_ACCESS_KEY,
  secretAccessKey: process.env.SERIALIZED_SECRET_ACCESS_KEY,
});

const projectionsClient = new ProjectionsClient(serializedClient);

router.post("/", async function (req, res) {
  try {
    var response = await projectionsClient.findOrdersProjection();
    res.send(response);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.post("/individual-order", async function (req, res) {
  const { orderId } = req.body;
  try {
    var response = await projectionsClient.findOrderBreakdownProjection(
      orderId
    );
    res.send(response);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router;
