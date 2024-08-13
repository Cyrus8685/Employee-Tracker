const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
const db = new Sequelize('postgres://test01:Testing1234@localhost:5432/postgres') // Example for postgres


db.query(`DROP DATABASE IF EXISTS employee_tracker_db WITH (FORCE);`);

setTimeout(() =>  {
db.query(`CREATE DATABASE employee_tracker_db;`);
}, 5000);