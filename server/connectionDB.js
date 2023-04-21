const mongoose = require("mongoose");

const connectionDB = async () => {
  try {
    const db = mongoose
      .connect(
        "mongodb+srv://sukanyaV:sukanyaVanganuru@cluster0.cwza8yj.mongodb.net/?retryWrites=true&w=majority"
      )
      .then(() => console.log("db connected"));
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectionDB;
