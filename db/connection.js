


const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";
const pathToEnvFile = `${__dirname}/../.env.${ENV}`;

require("dotenv").config({ path: pathToEnvFile });

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
} else {
  console.log(`You are connected to the ${ENV} database`);
}

const config =
  ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        max: 2,
      }
    : {};

module.exports = new Pool(config);










/*const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || 'development';
const config = {};

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

require('dotenv').config({path: `${__dirname}/../.env.${ENV}`})

const db = new Pool();

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error("PGDATABASE or DATABASE_URL not set")
} else { 
    console.log(`Connected to ${process.env.PGDATABASE}`)
}

module.exports = db;
module.exports = new Pool(config);*/