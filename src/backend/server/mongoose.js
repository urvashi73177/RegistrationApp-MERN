const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Connection is established");
  })
  .catch((err) => console.log(err));

const userRegistrationSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    // required: true
  },
  pass: {
    type: String,
    // required: true
  },
});

const UserRegistration = mongoose.model(
  "UserRegistration",
  userRegistrationSchema
);

module.exports = UserRegistration;
