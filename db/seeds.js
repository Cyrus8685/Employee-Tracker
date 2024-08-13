const { Sequelize } = require('sequelize');

const db = new Sequelize('postgres://test01:Testing1234@localhost:5432/employee_tracker_db');


const seeds = db.query(`

INSERT INTO department
  (name)
VALUES
  ('Engineering'),
  ('Sales'),
  ('Finance'),
  ('Legal');

INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Software Engineer', 85000, 1),
  ('Salesperson', 75000, 2),
  ('Accountant', 125000, 3),
  ('Lawyer', 200000, 4);

INSERT INTO employee
  (first_name, last_name, role_id, manager_name)
VALUES
  ('Juan', 'Garcia', 1, 'Steve'),
  ('Jonathan', 'Villcapoma', 2,'Kim'),
  ('Jesus', 'Meraz', 3, 'Christopher'),
  ('Estefany', 'Munoz', 4, 'Mariah');` );