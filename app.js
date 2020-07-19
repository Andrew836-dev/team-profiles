const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const preview = require("./lib/previewRenderer");

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
    console.log("Preview of employee list");
    preview(employees);
    inquirer.prompt([{
        type: "confirm",
        message: `${employees.length} total employees. Add another?`,
        name: "anotherEmployee"
    }]).then(({ anotherEmployee }) => (anotherEmployee ? promptForEmployeeData() : createHTML()));
}

function createHTML() {
    console.log("Grats!");
    const outputData = render(employees);
    if (!fs.existsSync(outputPath)) {
        console.log("Creating output Path");
        fs.mkdirSync(OUTPUT_DIR);
    }
    else {
        console.log("Output Directory exists");
    }
    console.log("Creating HTML file");
    fs.writeFileSync(outputPath, outputData);
}

function init(){
    console.log("Enter the details for your employees and a summary html file will be created");
    promptForEmployeeData();
}

init();

