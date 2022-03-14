const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");

app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/articles", require("./routes/articles"));

const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`server listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
