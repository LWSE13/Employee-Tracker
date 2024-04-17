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
        return this.query('SELECT * FROM department').then((res) => {
            console.table(res.rows);
        });
    }

    viewAllRoles() {
        console.log('Viewing all roles');
        return this.query('SELECT * FROM role').then((res) => {
            console.table(res.rows);
        });
    }

    viewAllEmployees() {
        console.log('Viewing all employees');
        return this.query('SELECT * FROM employee').then((res) => {
            console.table(res.rows);
        });
    }
}

module.exports = { Database, EmployeeDatabase };