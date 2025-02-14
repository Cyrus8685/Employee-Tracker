
// Variable Definitions & Dependencies
const inquirer = require('inquirer');
const db = require('./config/connection');

// Start server after DB connection

var employee_tracker = async function () {
    inquirer.prompt([{
        // Begin Command Line
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: ['View All Department', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Log Out']
    }]).then((answers) => {
        // Views the Department Table in the Database
        if (answers.prompt === 'View All Department') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Departments: ");
                console.table(result.rows);
                employee_tracker();
            });
        } else if (answers.prompt === 'View All Roles') {
            db.query(`SELECT * FROM role`, (err, result) => {
                 if (err) throw err;
                console.log("Viewing All Roles: ");
                console.table(result.rows);
                employee_tracker();
            });
        } else if (answers.prompt === 'View All Employees') {
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Employees: ");
                console.table(result.rows);
                employee_tracker();
            });
        } else if (answers.prompt === 'Add A Department') {
            inquirer.prompt([{
                // Adding a Department
                type: 'input',
                name: 'department',
                message: 'What is the name of the department?',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        console.log('Please Add A Department!');
                        return false;
                    }
                }
            }]).then((answers) => {
                db.query(`INSERT INTO department (name) VALUES ('${answers.department}');`, (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.department} to the database.`)
                    employee_tracker();
                });
            })
        } else if (answers.prompt === 'Add A Role') {
            // Beginning with the database so that we may acquire the departments for the choice
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;
               inquirer.prompt([
                    {
                        // Adding A Role
                        type: 'input',
                        name: 'role',
                        message: 'What is the name of the role?',
                        validate: roleInput => {
                            if (roleInput) {
                                return true;
                            } else {
                                console.log('Please Add A Role!');
                                return false;
                            }
                        }
                    },
                    {
                        // Adding the Salary
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary of the role?',
                        validate: salaryInput => {
                            if (salaryInput) {
                                return true;
                            } else {
                                console.log('Please Add A Salary!');
                                return false;
                            }
                        }
                    },
                    {
                        // Department
                        type: 'list',
                        name: 'department',
                        message: 'Which department does the role belong to?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.rows.length; i++) {
                                array.push(result.rows[i].name);
                            }
                            return array;
                        }
                    }
                ]).then((answers) => {
                    // Comparing the result and storing it into the variable
                    for (var i = 0; i < result.rows.length; i++) {
                        if (result.rows[i].name === answers.department) {
                            var departmentId = result.rows[i].id;
                        }
                    }
                    db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.role}', '${answers.salary}', '${departmentId}');`, (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.role} to the database.`)
                        employee_tracker();
                    });
                })
            });
        } else if (answers.prompt === 'Add An Employee') {
            // Calling the database to acquire the roles and managers
            db.query(`SELECT * FROM employee, role`, (err, result) => {
                if (err) throw err;
                inquirer.prompt([
                    {
                        // Adding Employee First Name
                        type: 'input',
                        name: 'firstName',
                        message: 'What is the employees first name?',
                        validate: firstNameInput => {
                            if (firstNameInput) {
                                return true;
                            } else {
                                console.log('Please Add A First Name!');
                                return false;
                            }
                        }
                    },
                    {
                        // Adding Employee Last Name
                        type: 'input',
                        name: 'lastName',
                        message: 'What is the employees last name?',
                        validate: lastNameInput => {
                            if (lastNameInput) {
                                return true;
                            } else {
                                console.log('Please Add A Salary!');
                                return false;
                            }
                        }
                    },
                    {
                        // Adding Employee Role
                        type: 'list',
                        name: 'role',
                        message: 'What is the employees role?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.rows.length; i++) {
                                array.push(result.rows[i].title);
                            }
                            var newArray = [...new Set(array)];
                            return newArray;
                        }
                    },
                    {
                        // Adding Employee Manager
                        type: 'list',
                        name: 'manager',
                        message: 'Who is the employees manager?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.rows.length; i++) {
                                array.push(result.rows[i].manager_name);
                            }
                            var managerArray = [...new Set(array)];
                            return managerArray;
                        }
                    },
                ]).then((answers) => {
                       
                    // Comparing the result and storing it into the variable
                    for (var i = 0; i < result.rows.length; i++) {
                        if (result.rows[i].title === answers.role) {
                            var roleId = result.rows[i].id;
                        }
                    }
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_name) VALUES ('${answers.firstName}','${answers.lastName}','${roleId}', '${answers.manager}');`, (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`)
                        employee_tracker();
                    });
                })
            });
        } else if (answers.prompt === 'Update An Employee Role') {
            // Calling the database to acquire the roles and managers
            db.query(`SELECT * FROM employee, role`, (err, result) => {

                if (err) throw err;
                inquirer.prompt([
                    {
                        // Choose an Employee to Update
                        type: 'list',
                        name: 'employee',
                        message: 'Which employees role do you want to update?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.rows.length; i++) {
                                array.push(result.rows[i].last_name);
                            }
                            var employeeArray = [...new Set(array)];
                            return employeeArray;
                        }
                    },
                    {
                        // Updating the New Role
                        type: 'list',
                        name: 'role',
                        message: 'What is their new role?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.rows.length; i++) {
                                array.push(result.rows[i].title);
                            }
                            var newArray = [...new Set(array)];
                            return newArray;
                        }
                    }
                ]).then((answers) => {
                    const name = answers.employee;

                    for (var i = 0; i < result.rows.length; i++) {
                        if (result.rows[i].title === answers.role) {
                            var roleId = (result.rows[i].id);
                        }
                    }
                    db.query(`UPDATE employee SET role_id = ${roleId} WHERE last_name = '${name}';`, (err, result) => {
                        if (err) throw err;
                        console.log(`Updated ${answers.employee} role to the database.`)
                        employee_tracker();
                    });
                })
            });
        } else if (answers.prompt === 'Log Out') {
            db.end();
            console.log("Good-Bye!");
        }
    })
};

try { db.connect(); console.log('Connected to PostgreSQL database!'); 
    employee_tracker(); } 
    catch (err) 
    { console.error('Error connecting to the database:', err); }