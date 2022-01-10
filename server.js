const express = require("express");
const path = require("path");
const app = express();
const initializeData = require("./dataLoad.js");
const { Client } = require("pg");

initializeData();

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, "public")));

app.get("/data", async (req, res) => {
  const client = new Client();
  await client.connect();
  let sendData = await client.query("SELECT * FROM data;");
  res.send(sendData.rows);
});

app.listen(8000, () => {
  console.log("server started on port 8000");
});
