const previewWidth = 15;

const preview = allEmployees => {
    // limits row to 80 characters
    const maxProfilesPerRow = (Math.floor(80 / previewWidth));
    const employees = allEmployees.slice(0, maxProfilesPerRow);
    const horizontalLine = "-".repeat(employees.length * (previewWidth + 1));
    const printList = [
        employees.map(employee =>
            renderWordSection(employee.getRole())
        ),
        employees.map(employee =>
            renderWordSection(employee.getName())
        ),
        employees.map(employee =>
            renderWordSection(employee.getId())
        ),
        employees.map(employee =>
            renderWordSection(employee.getEmail())
        )
    ]

    const roleSpecificList = [
        employees.map(employee =>
            getRoleSpecificTitle(employee)
        ),
        employees.map(employee =>
            renderWordSection(getRoleSpecificData(employee))
        )
    ]
    console.log(horizontalLine);
    logArray(printList);
    console.log(horizontalLine);
    logArray(roleSpecificList);
    console.log(horizontalLine);
    if (allEmployees.length > maxProfilesPerRow)
        preview(allEmployees.slice(maxProfilesPerRow));
}

const logArray = arrayIn => {
    arrayIn.forEach(item => console.log(item.join("\|")));
} 

const getRoleSpecificTitle = employee => {
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

const getRoleSpecificData = employee => {
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