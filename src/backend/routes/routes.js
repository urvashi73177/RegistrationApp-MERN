const express = require("express");
const UserRegistration = require("../server/mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await UserRegistration.findOne({ email: email });
    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("notexist error");
  }
});

// Add a new route for /signup
app.post("/user-data", async (req, res) => {
  const { email, password, name } = req.body;

  const data = {
    email: email,
    pass: password,
    name: name,
  };

  try {
    const check = await UserRegistration.findOne({ email: email });
    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await UserRegistration.insertMany([data]);
    }
  } catch (e) {
    console.log(e);
  }
});

app.listen(3000, () => {
  console.log("port connected to 3000");
});
