const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_ENDPOINT } = require("../constants");
const balanceSheetRouter = require("./routes/balanceSheet");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(`/${API_ENDPOINT}`, balanceSheetRouter);

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
