const previewWidth = 15;
const preview = allEmployees => {
    // limits row to 80 characters
    const employees = allEmployees.slice(0, (Math.floor(80 / previewWidth)));
    const printList = [
        employees.map(employee => renderWordSection(employee.getRole())),
        employees.map(employee => renderWordSection(employee.getName())),
        employees.map(employee => renderWordSection(employee.getId())),
        employees.map(employee => renderWordSection(employee.getEmail()))
    ]
    const specialList = [
        employees.map(employee => getSpecialTitle(employee)),
        employees.map(employee => renderWordSection(getSpecialData(employee)))
    ]
    const prettyCaps = "-".repeat(employees.length * (previewWidth + 1));
    console.log(prettyCaps);
    printList.forEach(item => {
        console.log(item.join("\|"));
    })
    console.log(prettyCaps);
    specialList.forEach(item => {
        console.log(item.join("\|"));
    })
    console.log(prettyCaps);
    if (allEmployees.length > (Math.floor(80 / previewWidth)))
        preview(allEmployees.slice((Math.floor(80 / previewWidth))));
}

const getSpecialTitle = employee => {
    switch (employee.getRole()) {
        case "Intern":
            return padded("School");
        case "Manager":
            return padded("Off. Num.");
        case "Engineer":
            return padded("Github");
        default:
            return "Do they work here?";
    }
}

const getSpecialData = employee => {
    switch (employee.getRole()) {
        case "Intern":
            return employee.getSchool();
        case "Manager":
            return employee.getOfficeNumber();
        case "Engineer":
            return employee.getGithub();
        default:
            return "Do they work here?";
    }
}

const padded = (string) => {
    return string + " ".repeat(previewWidth - string.length);
}

const trimmed = (string) => {
    return string.slice(0, previewWidth);
}

const renderWordSection = input => {
    const firstWord = input.split(" ")[0]
    if (firstWord.length < previewWidth) {
        return padded(firstWord);
    }
    else if (firstWord.length > previewWidth) {
        return trimmed(input);
    }
    else {
        return input;
    }
}

module.exports = preview;