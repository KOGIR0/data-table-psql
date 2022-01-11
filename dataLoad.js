require("dotenv").config();
const { Client } = require("pg");

// Loads initial data into database
async function initializeData() {
  const client = new Client();
  try {
    await client.connect();
    await client.query("DROP TABLE IF EXISTS data");
    await client.query(`CREATE TABLE IF NOT EXISTS data (
        data_id SERIAL PRIMARY KEY,
        data_date DATE,
        data_name VARCHAR(255),
        ammount INT,
        distance INT);`);

    await client.query(
      "INSERT INTO data (data_date, data_name, ammount, distance) VALUES ('2017-03-14', 'Monday', 5, 1000);"
    );
    await client.query(
      "INSERT INTO data (data_date, data_name, ammount, distance) VALUES ('2021-11-10', 'Tuesday', 13, 1300);"
    );
    await client.query(
      "INSERT INTO data (data_date, data_name, ammount, distance) VALUES ('2022-09-09', 'Wendsday', 25, 1500);"
    );
    await client.query(
      "INSERT INTO data (data_date, data_name, ammount, distance) VALUES ('2015-10-24', 'Thirsday', 10, 2300);"
    );
    await client.query(
      "INSERT INTO data (data_date, data_name, ammount, distance) VALUES ('2000-01-15', 'Friday', 30, 5500);"
    );
    await client.query(
      "INSERT INTO data (data_date, data_name, ammount, distance) VALUES ('2001-11-14', 'Sutarday', 13, 12500);"
    );
    await client.query(
      "INSERT INTO data (data_date, data_name, ammount, distance) VALUES ('2002-12-14', 'Sunday', 23, 4500);"
    );
  } catch (e) {
    console.log(e);
  }
}

module.exports = initializeData;
