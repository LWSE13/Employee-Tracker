INSERT INTO department (name) VALUES
    ('Engineering'),
    ('Sales'),
    ('Marketing'),
    ('Healthcare');

    INSERT INTO role (title, salary, department_id) VALUES
    ('Software Engineer', 100000, 1),
    ('Sales Manager', 80000, 2),
    ('Marketing Manager', 75000, 3),
    ('Lead Developer', 120000, 1),
    ('Salesperson', 50000, 2),
    ('Marketing Coordinator', 45000, 3),
    ('Junior Developer', 80000, 1),
    ('Sales Assistant', 30000, 2),
    ('Marketing Assistant', 25000, 3),
    ('Intern', 20000, 1);

    INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Alice', 'Johnson', 1, NULL),
    ('Bob', 'Smith', 2, 1),
    ('Cindy', 'Mitchell', 3, 1),
    ('David', 'Lee', 4, 1),
    ('Emily', 'Adams', 5, 2),
    ('Frank', 'Wong', 6, 3),
    ('Grace', 'Young', 7, 4),
    ('Hannah', 'Baker', 8, 5),
    ('Ian', 'Chen', 9, 6),
    ('Jack', 'Davis', 10, 7);