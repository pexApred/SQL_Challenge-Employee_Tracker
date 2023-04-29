const inquirer = require("inquirer");
const mysql = require('mysql2/promise');

class EmployeeTracker {
    constructor() {
        this.connection = mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '0987654321',
            database: 'employee_db'
        });
    }

    async start () {
        try {
            const { action } = await inquirer.prompt({
                name: 'action',
                type: 'list',
                message: 'What would you like to do?', 
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Exit'
                ]
            });
            
            switch (action) {
                case 'View all departments':
                    await this.viewAllDepartments();
                    break;
                case 'View all roles':
                    await this.viewAllRoles();
                    break;
                case 'View all employees':
                    await this.viewAllEmployees();
                    break;
                case 'Add a department':
                    await this.addDepartment();
                    break;
                case 'Add a role':
                    await this.addRole();
                    break;
                case 'Add an employee':
                    await this.addEmployee();
                    break;
                case 'Update an employee role':
                    await this.updateEmployeeRole();
                    break;
                case 'Exit':
                    console.log('Goodbye!');
                    this.connection.end();
                    process.exit();
            }
        } catch (err) {
            console.log(err);
            this.connection.end();
            process.exit();
        }
    }

    async viewAllDepartments () {
        try {
            const [rows, fields] = await this.connection.execute('SELECT * FROM department');
            console.table(rows);
            this.start();
        } catch (err) {
            console.log(err);
            this.start();
        }
    }

    async viewAllRoles () {
        try {
            const [rows, fields] = await this.connection.execute('SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id');
            console.table(rows);
            this.start();
        } catch (err) {
            console.log(err);
            this.start();
        }
    }

    async viewAllEmployees () {
        try {
            const [rows, fields] = await this.connection.execute('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id');
            console.table(rows);
            this.start();
        } catch (err) {
            console.log(err);
            this.start();
        }
    }

    async addDepartment () {
        try {
            const { name } = await inquirer.prompt({
                name: 'name',
                type: 'input',
                message: 'What is the name of the department?'
            });

            await this.connection.execute('INSERT INTO department (name) VALUES (?)', [name]);
            console.log(`Added ${name} department to the database.`);
            this.start();
        } catch (err) {
            console.log(err);
            this.start();
        }
    }

    async addRole () {
        try {
            const [departments] = await this.connection.execute('SELECT * FROM department');
            const department = await inquirer.prompt ({
                name: 'list',
                message: 'WHich department does the role belong to?',
                choices: departments.map(department => department.name)              
            });

            const { title, salary } = await inquirer.prompt([
                {
                    name: 'title',
                    type: 'input',
                    message: 'What is the title of the role?'
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'What is the salary of the role?'
                },

            ]);

            const departmentId = departments.find(dept => dept.name === department).id;

            await this.connection.execute('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
            console.log(`Added ${title} role to the database.`);
            this.start();
        } catch (err) {
            console.log(err);
            this.start();
        }
    }

    async addEmployee () {
        try {
            const [roles] = (await this.connection).execute('SELECT * FROM role');
            const [employees] = (await this.connection).execute('SELECT * FROM employee');
            const { firstName, lastName, role, manager } = await inquirer.prompt ([
                {
                    name: 'firstName',
                    type: 'input',
                    message: "What is the employee's first name?"
                },
                {
                    name: 'lastName',
                    type: 'input',
                    message: "What is the employee's last name?"
                },
                {
                    name: 'role',
                    type: 'list',
                    message: "What is the employee's role?",
                    choices: roles.map(role => role.title)
                },
                {
                    name: 'manager',
                    type: 'list',
                    message: "Who is the employee's manager?",
                    choices: employees.map(employee => `${employee.first_name} ${employee.last_name}`)
                }
            ]);

            const roleId = roles.find(r => r.title === role).id;
            const managerId = employees.find(e => `${e.first_name} ${e.last_name}` === manager).id;
            
            (await this.connection).execute('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
            console.log(`Added ${firstName} ${lastName} to the database.`);
            this.start();
        } catch (err) {
            console.log(err);
            this.start();
        }
    }

    async updateEmployeeRole() {
        try {
            const [employees] = (await this.connection).execute('SELECT * FROM employee');
            const [roles] = (await this.connection).execute('SELECT * FROM role');
            const { employee, role } = await inquirer.prompt([ 
                {
                    name: 'employee',
                    type: 'list',
                    message: 'Which employee would you like to update?',
                    choices: emmployees.map(employee => `${employee.first_name} ${employee.last_name}`)
                },
                {
                    name: 'role',
                    type: 'list',
                    message: 'What is the employee"s new role?',
                    choices: roles.map(role => role.title)
                }
            ]);
            const employeeId = employees.find(e => `${e.first_name} ${e.last_name}` === employee).id;
            const roleId = roles.find(r => r.title === role).id;

            (await this.connection).execute('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
            console.log(`Updated ${employee}'s role to ${role}.`);
            this.start();
        } catch (err) {
            console.log(err);
            this.start();
        }
    }
}

const employeeTracker = new EmployeeTracker();
employeeTracker.start();