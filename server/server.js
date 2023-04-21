const express = require("express");
const app = express();
const connectDB = require("../server/connectionDB");
const Userdetails = require("./model");
const cors = require("cors");
app.use(express.json());

app.use(cors());

connectDB();

app.get("/get", async (req, res) => {
  try {
    const getAllData = await Userdetails.find({ isActive: true });
    res.json(getAllData);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
});

app.post("/post", async (req, res) => {
  try {
    const { name, userName } = req.body;
    const post = new Userdetails({ name, userName });
    await post.save();
    res.json(post);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const deleteRecord = await Userdetails.findByIdAndUpdate(
      {_id: req.params.id} ,
      { isActive: false },
      { new: true }
    );
    console.log(req.params.id)
    res.status(200).json(deleteRecord);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(8000, () => {
  console.log("server runnig");
});
