// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const cors = require("cors");

// // const User = require("./models/User");
// app.use(express.json());
// app.use(cors());

// // app.use("/", (req, res) => {
// //   res.send("url working");
// // });

// const CONNECTION_URL =
//   "mongodb+srv://admin:qwertymong0@cluster0.oqimsqn.mongodb.net/nic_mern_database?retryWrites=true&w=majority";

// mongoose.connect(CONNECTION_URL, () => console.log("Connected to Database"));

// //Routers
// const create = require("./router/create");
// const get = require("./router/get");
// const update = require("./router/update");
// const deletes = require("./router/delete");

// //API
// app.use("/create", create);
// app.use("/get", get);
// app.use("/update", update);
// app.use("/delete", deletes);

// app.listen(5000, () => {
//   console.log("You are connected...");
// });

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const mongoose = require("mongoose");

const User = require("./models/User");

/// DATABASE CONNECTION
mongoose.connect(
  "mongodb+srv://admin:qwertymong0@cluster0.oqimsqn.mongodb.net/nic_mern_database?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.post("/insert", async (req, res) => {
  const userimage = req.body.userimage;
  const name = req.body.name;
  const email = req.body.email;
  const gender = req.body.gender;
  const address = req.body.address;
  const district = req.body.district;

  const user = new User({
    userimage: userimage,
    name: name,
    email: email,
    gender: gender,
    address: address,
    district: district,
  });
  await user.save();
  res.send("Inserted DATA");
});

app.get("/read", async (req, res) => {
  User.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put("/update", async (req, res) => {
  const filter = { _id: req.body.id };
  const update = {
    userimage: req.body.userimage,
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    address: req.body.address,
    district: req.body.district,
  };

  await User.findOneAndUpdate(filter, update);
  res.status(200).send(update);
});

app.post("/delete", async (req, res) => {
  const filter = { _id: req.body.id };

  let doc = await User.deleteOne(filter);
  res.status(200).send(req.body);
});

// Search
app.get("/search", async (req, res) => {
  const { q } = req.query;

  // const keys = ["first_name", "last_name", "email"];

  // const search = (data) => {
  //   return data.filter((item) =>
  //     keys.some((key) => item[key].toLowerCase().includes(q))
  //   );
  // };

  // return console.log(q);

  // db.Employee.find({ EmployeeName: { $regex: "Gu" } }).forEach(printjson);

  // const users = await User.find({ email: { $regex: q } });

  if (q) {
    var query = {};
    query = {
      $or: [
        { email: { $regex: q, $options: "i" } },
        { name: { $regex: q, $options: "i" } },
        { gender: { $regex: q, $options: "i" } },
        { address: { $regex: q, $options: "i" } },
        { district: { $regex: q, $options: "i" } },
      ],
    };
    const users = await User.find(query);
    return res.send(users);
  } else {
    User.find({}, (err, result) => {
      if (err) {
        return res.send(err);
      } else {
        return res.send(result.slice(0, 3));
      }
    });
  }
});

// app.get("/duplicate", async (req, res) => {
//   const x = await User.count({ name: name === name });
//   console.log(x);
// });

app.listen(5000, () => {
  console.log("You are connected!");
});
