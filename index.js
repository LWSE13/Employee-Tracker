require('dotenv').config();
const inquirer = require('inquirer');
const  { Database, EmployeeDatabase }  = require('./db/db.js');
const {mainMenuQuestions,
    addDepartmentQuestions,
    addRoleQuestions,
    addEmployeeQuestions,
    updateEmployeeRoleQuestions} = require('./questions');

    const database = new EmployeeDatabase({
        user: process.env.DB_USER,
        host: 'localhost',
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: '5432'
    });

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
                database.viewAllDepartments();
                setTimeout(mainMenuSelect, 500);
                break;
            case 'view_all_roles':
                database.viewAllRoles();
                setTimeout(mainMenuSelect, 500);
                break;
            case 'view_all_employees':
                database.viewAllEmployees();
                setTimeout(mainMenuSelect, 500);
                break;
            case 'quit':
                database.close();
                break;
        }
    });
}

mainMenuSelect();
