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
            return res.rows;
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
            return res.rows;
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
            return res.rows;
        });
    }

    getDepartments() {
        return this.query('SELECT * FROM department');
    }

    getRoles() {
        return this.query('SELECT * FROM role');
    }

    getEmployees() {
        return this.query('SELECT * FROM employee');
    }

    addDepartment(departmentName) {
        console.log(`Adding department: ${departmentName}`);
        return this.query(`
            INSERT INTO department (name) 
            VALUES ($1)
        `, [departmentName]).then((res) => {
            console.log('Department added successfully');
        });
    }
    
    addRole(roleTitle, roleSalary, roleDepartment) {
        console.log(`Adding role: ${roleTitle}`);
        return this.query(`
            INSERT INTO role (title, salary, department_id) 
            VALUES ($1, $2, $3)
        `, [roleTitle, roleSalary, roleDepartment]).then((res) => {
            console.log('Role added successfully');
        });
    }
    
    addEmployee(employeeFirstName, employeeLastName, employeeRole, employeeManager) {
        console.log(`Adding employee: ${employeeFirstName} ${employeeLastName}`);
        return this.query(`
            INSERT INTO employee (first_name, last_name, role_id, manager_id) 
            VALUES ($1, $2, $3, $4)
        `, [employeeFirstName, employeeLastName, employeeRole, employeeManager]).then((res) => {
            console.log('Employee added successfully');
        });
    }
    
    updateEmployeeRole(employee_id, role_id) {
        console.log(`Updating employee id: ${employee_id}`);
        return this.query(`
            UPDATE employee 
            SET role_id = $1 
            WHERE id = $2
        `, [role_id, employee_id]).then((res) => {
            console.log('Employee updated successfully');
        });
    }
}

module.exports = { Database, EmployeeDatabase };