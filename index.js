require("dotenv").config();
const express = require("express");
const app = express();
const { PORT } = process.env;

app.get("/", (req, res) => {
  res.send("You've made it. - Brady S");
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
