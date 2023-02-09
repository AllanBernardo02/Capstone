const express = require("express");
const app = express();

const userRoute = require("./routes/userRoute.js");

app.use(express.json());
require("dotenv").config();

const dbConfig = require("./config/dbConfig");

const PORT = process.env.PORT || 4000;

console.log(process.env.MONGO_URL);

app.use("/api/user", userRoute);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
