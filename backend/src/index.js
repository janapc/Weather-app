require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const routes = require("./routes");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);
