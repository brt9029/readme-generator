import inquirer from 'inquirer';

function init() {
    inquirer
        .prompt([
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
                name: 'projectDescription',
                message: 'Enter the description for your project',
                validate: projectDesc => {
                    if (projectDesc) {
                        return true;
                    } else {
                        console.log('Please enter a description of your project!');
                        return false;
                    }
                }
            }
        ])
}