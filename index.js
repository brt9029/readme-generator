import inquirer from 'inquirer';
import fs from 'fs';
import { generateReadme } from './src/page-template.js';

function promptProject() {
    console.log(`
    ================================
    Welcome to the README generator!
    ================================

    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'Enter the name of your project',
            validate: projectInput => {
                if (projectInput) {
                    return true;
                } else {
                    console.log('Please enter the name of your project!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'projectDesc',
            message: 'Enter a short description for your project',
            validate: projectDesc => {
                if (projectDesc) {
                    return true;
                } else {
                    console.log('Please enter a description of your project!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'projectReason',
            message: 'Enter why did you build this project',
            validate: projectReason => {
                if (projectReason) {
                    return true;
                } else {
                    console.log('Please enter why you decided to build this project!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'projectLearn',
            message: 'What did you learn from building this project?',
            validate: projectLearn => {
                if (projectLearn) {
                    return true;
                } else {
                    console.log('Please enter what you learned from building this project!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'credit',
            message: 'Enter the GitHub username for the Credits section',
            validate: credit => {
                if (credit) {
                    return true;
                } else {
                    console.log('Please enter an author for this project');
                    return false;
                }
            }
        }
    ])
};

function promptInstall(projectData) {
    if (!projectData.steps) {
        projectData.steps = [];
    }
    console.log(`
    =========================
    Installation Instructions
    =========================
    `);

    return inquirer.prompt([
        {
            type: 'input',
            name: 'install',
            message: 'Provide a step-by-step to install your project',
            validate: step => {
                if (step) {
                    return true;
                } else {
                    console.log('Please enter the next step');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmInstallStep',
            message: 'Would you like to enter another step?',
            default: false
        }
    ])
    .then(installData => {
        projectData.steps.push(installData);
        if (installData.confirmInstallStep) {
            return promptInstall(projectData);
        } else {
            return projectData;
        }
    });
};

function promptUsage(projectData) {
    if (!projectData.instructions) {
        projectData.instructions = [];
    }
    console.log(`
    ==================
    Usage Instructions
    ==================
    `);

    return inquirer.prompt([
        {
            type: 'input',
            name: 'instruction',
            message: 'Provide instructions on how to use your project',
            validate: usage => {
                if (usage) {
                    return true;
                } else {
                    console.log('Please enter instructions on how to use your project!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmUsageStep',
            message: 'Would you like to enter another step for instruction on how to use your project?',
            default: false
        },
    ])
    .then(usageData => {
        projectData.instructions.push(usageData);
        if (usageData.confirmUsageStep) {
            return promptUsage(projectData);
        } else {
            return projectData;
        }
    })
};

function writeFile(readmeFile) {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', readmeFile, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

promptProject()
    .then(promptInstall)
    .then(promptUsage)
    .then(readmeData => {
        return generateReadme(readmeData);
    })
    .then(readmeOutput => {
        return writeFile(readmeOutput);
    })
    .catch(err => {
        console.log(err);
    });