const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
const db = new Sequelize('postgres://test01:Testing1234@localhost:5432/employee_tracker_db') // Example for postgres

 db.query(`
    CREATE TABLE department (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30)
    );
    
    CREATE TABLE role (
        id SERIAL PRIMARY KEY,
        title VARCHAR(30),
        salary DECIMAL,
        department_id INTEGER
    );
    
    CREATE TABLE employee (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        role_id INTEGER,
        manager_name VARCHAR(30)
    );`);