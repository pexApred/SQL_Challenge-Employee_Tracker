const inquirer = require("inquirer");
const mysql = require('mysql/promise');

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