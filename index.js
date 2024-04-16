require('dotenv').config();
const inquirer = require('inquirer');
const  Database  = require('./db/db.js');
const {mainMenuQuestions,
    addDepartmentQuestions,
    addRoleQuestions,
    addEmployeeQuestions,
    updateEmployeeRoleQuestions} = require('./questions');

    const database = new Database();

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
                database.end();
                break;
        }
    });
}


// Call the methods and check the output
database.viewAllDepartments();
database.viewAllRoles();
database.viewAllEmployees();