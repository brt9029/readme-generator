function installation(steps) {
    return `${steps
        .map(({ install }) => {
            return `- ${install}\n`;
        })
        .join('')}`;
};

function usage(instructions) {
    return `${instructions
        .map(({ instruction }) => {
        return `- ${instruction}`
        })
        .join('')}`;
}

export function generateReadme(readmeData) {
    const { steps, instructions, ...main } = readmeData;

    return `# ${main.projectName}

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
${installation(steps)}

## Usage
${usage(instructions)}

## Credits
- ${main.credit}`;
};