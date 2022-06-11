const router = require("express").Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  const filter = { _id: req.body._id };

  const update = {
    name: req.body.name,
    age: req.body.age,
    city: req.body.city,
    country: req.body.country,
  };

  await User.findOneAndUpdate(filter, update);
  res.status(200).send(update);
});

module.exports = router;
