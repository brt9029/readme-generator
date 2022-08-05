export function generateReadme(readmeData) {
    const { projectName, steps, instructions } = readmeData;

    return `
    #${projectName}
    #${steps}
    #${instructions}
    `;
};