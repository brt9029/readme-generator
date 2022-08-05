function installation(steps) {
    // parse through the steps and format
};

export function generateReadme(readmeData) {
    const { steps, instructions, ...main } = readmeData;

    return `
    # ${main.projectName}

    ## Description

    - ${main.projectDesc}
    - ${main.projectReason}
    - ${main.projectLearn}


    ## Table of Contents
    - [Installation](#installation)
    - [Usage](#usage)
    - [Credits](#credits)
    - [License](#license)

    ## Installation
    ${steps[0].install}
    ${installation(steps)}

    ## Usage


    ## Credits
    
    `;
};