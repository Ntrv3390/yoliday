const express = require("express");
const dataRouter = require("./routes/data.route.js");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())
app.use("/api", dataRouter);

app.listen(PORT);

module.exports = app;