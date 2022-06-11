const router = require("express").Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  const response = await User.find({});

  res.status(200).send(response);
});

module.exports = router;
