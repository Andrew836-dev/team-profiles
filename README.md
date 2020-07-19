# Team Profile Builder
CLI program to create a HTML file with team member details.  
![License badge](https://img.shields.io/badge/license-MIT-green)
## Table of Contents
1. [Installation](#Installation)
2. [Usage](#Usage)
3. [License](#License)
4. [Contribution](#Contribution)
5. [Questions](#Questions)
## Installation
You can Fork and clone this repository to your local machine.  
This program requires **Node.js**, **Inquirer** and **Jest** for testing.  
The included package.json means you can type `npm install` from the command line to install Inquirer.
## Usage
`node app` will run the program.  
Then simply follow the prompts to create your team.html file.  
The prompts will ask for:
* Employee name
* Employee ID
* Employee email
* Employee role (Intern, Engineer, Manager)

Then after a role is selected, another question relevant to that role will be asked.
* School for Interns
* Github username for Engineers
* Office Number for Mangers

<img src="./img/team-profiles-first-employee.png" alt="Image showing command line executing and first employee entered">
<img src="./img/team-profiles-just-say-no.png" alt="Image showing the user choosing the end the program and the HTML file being generated">
<img src="./img/team-profiles-output.png" alt="Image showing the final HTML page">

## License
This project uses a MIT license.
## Contributing
This was a solo project by Andrew Gray.  
This project is not open to contributions at this time.
## Tests
With **Jest** installed, type `npm run test` in the app directory. This will run the tests on the Employee, Intern, Manager and Engineer class files.
## Questions
You can find my github account at
[Andrew836-dev](https://github.com/Andrew836-dev)  
