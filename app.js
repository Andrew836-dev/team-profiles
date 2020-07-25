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
function askInitialQuestions(role) {
    return inquirer.prompt([
        {
            message: `Please enter ${role} name:`,
            name: "name"
        },
        {
            message: `Please enter ${role} ID number:`,
            name: "id"
        },
        {
            message: `Please enter ${role} email address:`,
            name: "email"
        }
    ]);
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function promptForEmployeeData(role) {
    askInitialQuestions().then(response => handleData(response));
    //,
    //,
    // 
}

function handleData(employeeData) {
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
}

function createManager() {
    askInitialQuestions("your").then(({ name, id, email }) => {
        inquirer.prompt(
            {
                type: "input",
                message: "Please enter the office number for the manager:",
                name: "officeNumber"
            }
        ).then(({ officeNumber }) =>
            pushAndAskIfFinished(new Manager(name, id, email, officeNumber)));
    });
}

function createEngineer() {
    askInitialQuestions("the engineer's").then(({ name, id, email }) => {
        inquirer.prompt(
            {
                type: "input",
                message: "Please enter the github name for the engineer:",
                name: "github"
            }
        ).then(({ github }) =>
            pushAndAskIfFinished(new Engineer(name, id, email, github))
        );
    });
}

function createIntern() {
    askInitialQuestions("the intern's").then(({ name, id, email }) => {
        inquirer.prompt(
            {
                type: "input",
                message: "Please enter the school for the intern:",
                name: "school"
            }
        ).then(({ school }) =>
            pushAndAskIfFinished(new Intern(name, id, email, school)));
    });
}

function pushAndAskIfFinished(employee) {
    employees.push(employee);
    console.log("Preview of employee list");
    preview(employees);
    inquirer.prompt({
        type: "list",
        message: `${employees.length} total employees. Add another?`,
        choices: ["Engineer", "Intern", "No thanks, I'm finished"],
        name: "anotherEmployee"
    }).then(({ anotherEmployee }) => {
        if (anotherEmployee === "Engineer") createEngineer();
        else if (anotherEmployee === "Intern") createIntern();
        else createHTML();
    });
}

function createHTML() {
    console.log("Input completed");
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

function init() {
    console.log("Enter the details for yourself first and then your employees.\nA summary html file will be created");
    createManager();
}

init();

