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
                addDepartment().then(() => {
                    mainMenuSelect();
                });
                break;
            case 'add_role':
                addRole().then(() => {
                    mainMenuSelect();
                });
                break;
            case 'add_employee':
                addEmployee().then(() => {
                    mainMenuSelect();
                });
                break;
            case 'update_employee_role':
                updateEmployeeRole().then(() => {
                    mainMenuSelect();
                });
                break;
            case 'view_all_departments':
                database.viewAllDepartments().then(() => {
                    mainMenuSelect();
                });
                break;
            case 'view_all_roles':
                database.viewAllRoles().then(() => {
                    mainMenuSelect();
                });
                break;
            case 'view_all_employees':
                database.viewAllEmployees().then(() => {
                    mainMenuSelect();
                });
                break;
            case 'quit':
                database.close();
                break;
        }
    });
}



const addDepartment = () => {
    return inquirer.prompt(addDepartmentQuestions).then((answers) => {
        return database.addDepartment(answers.departmentName);
    })
}

const addRole = () => {
    return database.getDepartments().then((result) => {
        const departments = result.rows;

      
        const roleDepartmentQuestion = addRoleQuestions.find(question => question.name === 'roleDepartment');
        roleDepartmentQuestion.choices = departments.map(department => ({
            name: department.name,
            value: department.id
        }));

        return inquirer.prompt(addRoleQuestions).then((answers) => {
            return database.addRole(answers.roleTitle, answers.roleSalary, answers.roleDepartment);
        });
    });
}

const addEmployee = () => {
   return Promise.all([database.getRoles(), database.getEmployees()]).then(([roleResult, employeeResult]) => {
        const roles = roleResult.rows;
        const employees = employeeResult.rows;

        const employeeRoleQuestion = addEmployeeQuestions.find(question => question.name === 'employeeRole');
        employeeRoleQuestion.choices = roles.map(role => ({ name: role.title, value: role.id }));

        const employeeManagerQuestion = addEmployeeQuestions.find(question => question.name === 'employeeManager');
        employeeManagerQuestion.choices = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));

        return inquirer.prompt(addEmployeeQuestions).then((answers) => {
            return database.addEmployee(answers.employeeFirstName, answers.employeeLastName, answers.employeeRole, answers.employeeManager);
        });
    });
}

const updateEmployeeRole = () => {
   return Promise.all([database.getEmployees(), database.getRoles()]).then(([employeeResult, roleResult]) => {
        const employees = employeeResult.rows;
        const roles = roleResult.rows;

        const employeeIdQuestion = updateEmployeeRoleQuestions.find(question => question.name === 'employeeId');
        employeeIdQuestion.choices = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));

        const roleIdQuestion = updateEmployeeRoleQuestions.find(question => question.name === 'roleId');
        roleIdQuestion.choices = roles.map(role => ({ name: role.title, value: role.id }));

       return inquirer.prompt(updateEmployeeRoleQuestions).then((answers) => {
           return database.updateEmployeeRole(answers.employeeId, answers.roleId);
        });
    });
}

mainMenuSelect();