const mainMenuQuestions = [
    {
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to do?',
        choices: [ 
            {value: 'view_all_departments', name: 'View All Departments'},
            {value: 'view_all_roles', name: 'View All Roles'},
            {value: 'view_all_employees', name: 'View All Employees'},
            {value: 'add_department', name: 'Add Department'},
            {value: 'add_role', name: 'Add Role'},
            {value: 'add_employee', name: 'Add Employee'},
            {value: 'update_employee_role', name: 'Update Employee Role'},
            {value: 'quit', name: 'Quit'}

        ],
    },
]

const addDepartmentQuestions = [
    {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?'
    }
]

const addRoleQuestions = [
    {
        type: 'input',
        name: 'roleTitle',
        message: 'What is the title of the role?'
    },
    {
        type: 'number',
        name: 'roleSalary',
        message: 'What is the salary of the role? (must be numeric)',
        validate: function(value) {
            if (isNaN(value)) {
                return 'Please enter a number';
            }
            return true;
        }
    },
    {
        type: 'list',
        name: 'roleDepartment',
        message: 'What is the department of the role?',
        choices: []
    }
]

const addEmployeeQuestions = [
    {
        type: 'input',
        name: 'employeeFirstName',
        message: 'What is the first name of the employee?'
    },
    {
        type: 'input',
        name: 'employeeLastName',
        message: 'What is the last name of the employee?'
    },
    {
        type: 'list',
        name: 'employeeRole',
        message: 'What is the role of the employee?',
        choices: []
    },
    {
        type: 'list',
        name: 'employeeManager',
        message: 'Who is the manager of the employee?',
        choices: []
    }
]

const updateEmployeeRoleQuestions = [
    {
        type: 'list',
        name: 'employeeId',
        message: 'What is the id of the employee?',
        choices: []
    },
    {
        type: 'list',
        name: 'roleId',
        message: 'What is the id of the new role?',
        choices: []
    }
]

module.exports = { 
    mainMenuQuestions,
    addDepartmentQuestions,
    addRoleQuestions,
    addEmployeeQuestions,
    updateEmployeeRoleQuestions
}