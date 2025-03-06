import mongoose from "mongoose";

const companySchme = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  password: { type: String, required: true },
});

const compnayModel = mongoose.model("company", companySchme);

export default compnayModel;
