const { Client } = require('pg');
 
const client = new Client({ user: 'root', host: 'localhost', database: 'employee_tracker_db', password: 'TestPassword1234', port: '5432', });
    
    module.exports = client