# SQL_Challenge-Employee_Tracker [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

My task was to build a content management system (CMS). This is a command-line application built with Node.js, Inquirer, and MySQL that allows users to manage a company's employee database. It provides an interface for users to easily view and interact with information stored in the database, such as departments, roles, and employees.

The application satifies the following user story and acceptance criteria:

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Badges](#badges)

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory using the command line.
3. Run the command "npm install" to install all necessary dependencies.
4. Set up your database by running the command "mysql -u root -p" in the command line.
5. Once in MySQL, run the command "SOURCE db/schema.sql" to create the database schema. Then run the command "SOURCE db/seeds.sql to seed the data.
6. Exit MySQL by typing "quit". 
7. Start the application by running the command "node index.js" OR "npm start" in the command line.
8. Follow the prompts to view and manage departments, roles, and employees in your company.

## Usage

Once the application is running, users can navigate the differnt options using the arrow keys and enter key on their keyboard. they can view, add, or update departments, roles, and employees as needed. Link to walkthrough below:


    ```md
    ![alt text](assets/images/screenshot.png)
    ```

## Credits

Emmanuel Lakis - https://github.com/pexApred
Benicio Lopez - Tutor

Video Submission guide - https://coding-boot-camp.github.io/full-stack/computer-literacy/video-submission-guide

NPM Documentation: https://www.npmjs.com/package/mysql2

## License

MIT License

Copyright (c) 2023 Emmanuel Lakis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Badges

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
