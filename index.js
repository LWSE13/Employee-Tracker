require('dotenv').config();
const inquirer = require('inquirer');
const { Client } = require('pg');
const {mainMenuQuestions,
    addDepartmentQuestions,
    addRoleQuestions,
    addEmployeeQuestions,
    updateEmployeeRoleQuestions} = require('./questions');

const database = new Client({
  user: process.env.DB_USER,
  host: 'localhost',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

database.connect();

const mainMenuSelect = () => {
    inquirer.prompt(mainMenuQuestions).then((answers) => {
        switch(answers.mainMenu) {
            case 'add_department':
                addDepartment();
                break;
            case 'add_role':
                addRole();
                break;
            case 'add_employee':
                addEmployee();
                break;
            case 'update_employee_role':
                updateEmployeeRole();
                break;
            case 'view_all_departments':
                viewAllDepartments();
                break;
            case 'view_all_roles':
                viewAllRoles();
                break;
            case 'view_all_employees':
                viewAllEmployees();
                break;
            case 'quit':
                client.end();
                break;
        }
    });
}