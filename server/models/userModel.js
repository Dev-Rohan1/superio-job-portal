import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
