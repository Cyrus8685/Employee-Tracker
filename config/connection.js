const pg = require('pg');
const { Client } = pg
const client = new Client()

// Option 1: Passing a connection URI
module.exports = db = new Client('postgres://test01:Testing1234@localhost:5432/employee_tracker_db');