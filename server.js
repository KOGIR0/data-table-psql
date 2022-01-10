const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.listen(5000, () => {
  console.log("server started on port 5000");
});
