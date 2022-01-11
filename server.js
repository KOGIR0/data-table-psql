const express = require("express");
const path = require("path");
const app = express();
const initializeData = require("./dataLoad.js");
const { Client } = require("pg");

if (process.env.NODE_ENV === "development") {
  console.log("Develpment mode");
  // initialazes PostgreSQL data
  // runs if you set .env variable NODE_ENV="development"
  initializeData();
} else {
  console.log("Production mode");
}

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, "public")));

app.get("/data", async (req, res) => {
  const client = new Client();
  await client.connect();
  let dataToSend;

  try {
    dataToSend = await client.query(
      "SELECT TO_CHAR(data_date, 'DD/MM/YYYY') as date, data_name as name, ammount, distance FROM data;"
    );
    dataToSend = dataToSend.rows.map((value) => {
      return {
        date: value.date,
        name: value.name,
        ammount: parseInt(value.ammount),
        distance: parseInt(value.distance),
      };
    });
  } catch (e) {
    res.send(e);
  }

  res.send(dataToSend);
});

app.listen(8000, () => {
  console.log("server started on port 8000");
});
