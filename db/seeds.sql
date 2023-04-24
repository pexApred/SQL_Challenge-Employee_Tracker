USE employee_db;

INSERT INTO department (id, name)
VALUES  (1, "Sales"),
        (2, "Engineering"),
        (3, "Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES  (1, "Software Engineer", 70000, 2),
        (2, "Lawyer", 100000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "Bob", "Ross", 1, NULL),
        (2, "Joe", "Dirt", 2, 1),
        (3, "Sally", "Snyder", 1, 1);