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



const addDepartment = () => {
    inquirer.prompt(addDepartmentQuestions).then((answers) => {
        database.addDepartment(answers.departmentName);
    })
}

const addRole = () => {
    database.getDepartments().then((result) => {
        const departments = result.rows;

      
        const roleDepartmentQuestion = addRoleQuestions.find(question => question.name === 'roleDepartment');
        roleDepartmentQuestion.choices = departments.map(department => ({
            name: department.name,
            value: department.id
        }));

        inquirer.prompt(addRoleQuestions).then((answers) => {
            database.addRole(answers.roleTitle, answers.roleSalary, answers.roleDepartment);
        });
    });
}

const addEmployee = () => {
    Promise.all([database.getRoles(), database.getEmployees()]).then(([roleResult, employeeResult]) => {
        const roles = roleResult.rows;
        const employees = employeeResult.rows;

        const employeeRoleQuestion = addEmployeeQuestions.find(question => question.name === 'employeeRole');
        employeeRoleQuestion.choices = roles.map(role => ({ name: role.title, value: role.id }));

        const employeeManagerQuestion = addEmployeeQuestions.find(question => question.name === 'employeeManager');
        employeeManagerQuestion.choices = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));

        inquirer.prompt(addEmployeeQuestions).then((answers) => {
            database.addEmployee(answers.employeeFirstName, answers.employeeLastName, answers.employeeRole, answers.employeeManager);
        });
    });
}

const updateEmployeeRole = () => {
    Promise.all([database.getEmployees(), database.getRoles()]).then(([employeeResult, roleResult]) => {
        const employees = employeeResult.rows;
        const roles = roleResult.rows;

        const employeeIdQuestion = updateEmployeeRoleQuestions.find(question => question.name === 'employeeId');
        employeeIdQuestion.choices = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));

        const roleIdQuestion = updateEmployeeRoleQuestions.find(question => question.name === 'roleId');
        roleIdQuestion.choices = roles.map(role => ({ name: role.title, value: role.id }));

        inquirer.prompt(updateEmployeeRoleQuestions).then((answers) => {
            database.updateEmployeeRole(answers.employeeId, answers.roleId);
        });
    });
}

mainMenuSelect();