require("dotenv").config();
const { Client } = require("pg");

async function initializeData() {
  const client = new Client();
  try {
    await client.connect();
    await client.query("DROP TABLE IF EXISTS data");
    await client.query(`CREATE TABLE IF NOT EXISTS data (
        data_id SERIAL PRIMARY KEY,
        data_date TIMESTAMP,
        data_name VARCHAR(255),
        distance INT);`);

    await client.query(
      "INSERT INTO data (data_date, data_name, distance) VALUES ('2017-03-14', 'Monday', 1000);"
    );
    await client.query(
      "INSERT INTO data (data_date, data_name, distance) VALUES ('2021-11-14', 'Tuesday', 1300);"
    );
  } catch (e) {
    console.log(e);
  }

  console.log(
    process.env.PGHOST,
    process.env.PGUSER,
    process.env.PGDATABASE,
    process.env.PGPORT
  );
}

module.exports = initializeData;
