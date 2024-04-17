const { Pool } = require('pg');

class Database {
    constructor(config) {
        this.client = new Pool(config);
    }

    connect() {
        return this.client.connect().then(() => console.log('Connected to database'));
    }

    query(sql, args) {
        return this.client.query(sql, args);
    }

    close() {
        return this.client.end();
    }

    viewAllDepartments() {
        console.log('Viewing all departments');
        return this.query('SELECT * FROM department').then((res) => {
            console.table(res.rows);
        });
    }
}


class EmployeeDatabase extends Database {
    constructor(config) {
        super(config);
    }

    viewAllDepartments() {
        console.log('Viewing all departments');
        return this.query(`
            SELECT * 
            FROM department
        `).then((res) => {
            console.table(res.rows);
        });
    }
    
    viewAllRoles() {
        console.log('Viewing all roles');
        return this.query(`
            SELECT 
                role.id, 
                role.title, 
                role.salary, 
                department.name AS department_name 

            FROM department 

            JOIN role ON role.department_id = department.id
        `).then((res) => {
            console.table(res.rows);
        });
    }
    
    viewAllEmployees() {
        console.log('Viewing all employees');
        return this.query(`
            SELECT 
                employee.id, 
                CONCAT(employee.first_name, ' ', employee.last_name) AS full_name, 
                role.title AS role_title, 
                role.salary AS role_salary, 
                department.name AS department_name, 
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name 

            FROM employee 
            
            JOIN role ON employee.role_id = role.id 
            JOIN department ON role.department_id = department.id 
            LEFT JOIN employee AS manager ON employee.manager_id = manager.id
        `).then((res) => {
            console.table(res.rows);
        });
    }
}

module.exports = { Database, EmployeeDatabase };