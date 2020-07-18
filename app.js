const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Array for holding employee info until they get rendered.
const employees = [];

// questions common to all employees
function askInitialQuestions() {
    return inquirer.prompt([
        {
            message: "Please enter the employee name:",
            name: "name"
        },
        {
            message: "Please enter the employee ID:",
            name: "id"
        },
        {
            message: "Please enter the employee email address:",
            name: "email"
        },
        {
            type: "list",
            message: "Please choose the employee role:",
            choices: ["Intern", "Engineer", "Manager"],
            name: "role"
        }
    ]);
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function promptForEmployeeData() {
    askInitialQuestions().then(employeeData => {
        switch (employeeData.role) {
            case "Intern":
                return createIntern(employeeData);
            case "Engineer":
                return createEngineer(employeeData);
            case "Manager":
                return createManager(employeeData);
            default:
                console.log("Something went wrong with the switch");
        }
    });
}

function createEngineer(employeeData) {
    inquirer.prompt([{
        message: "Please enter the github name for the engineer:",
        name: "github"
    }]).then(answer =>
        pushAndAskForMore(new Engineer(employeeData.name, employeeData.id, employeeData.email, answer.github))
    );
}

function createManager(employeeData) {
    inquirer.prompt([{
        message: "Please enter the office number for the manager:",
        name: "officeNumber"
    }]).then(answer =>
        pushAndAskForMore(new Manager(employeeData.name, employeeData.id, employeeData.email, answer.officeNumber))
    );
}

function createIntern(employeeData) {
    inquirer.prompt({
        message: "Please enter the school for the intern:",
        name: "school"
    }).then(answer =>
        pushAndAskForMore(new Intern(employeeData.name, employeeData.id, employeeData.email, answer.school))
    );
}

function pushAndAskForMore(employee) {
    employees.push(employee);
    inquirer.prompt([{
        type: "confirm",
        message: `${employees.length} total employees. Add another?`,
        name: "anotherEmployee"
    }]).then(({ anotherEmployee }) => (anotherEmployee ? promptForEmployeeData() : finishedQuestions()));
}

function finishedQuestions() {
    
    console.log("Grats!");
    console.log(render(employees));
}

promptForEmployeeData()

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
