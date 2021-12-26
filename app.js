const inquirer = require('inquirer');


// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);

// fs.writeFile('index.html', generatePage(name, github), err => {
//     if (err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:'
        }
    ]);
};

const promptProject = portfolioData => {
    //if there are no projects array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
        =================
        Add a new project
        =================
        `);
    return inquirer.prompt([
        {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)'
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'JQuery', 'Bootstrap','Node' ]
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)'
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {   //In this condition, we're evaluating the user response to whether they wish to add more projects. This response was captured in the answer object, projectData, in the property confirmAddProject. If the user wishes to add more projects, then this condition will evaluate to true and call the promptProject(portfolioData) function.
            return promptProject(portfolioData);
        } else {    //If the user decides not to add more projects, then the condition will evaluate to false and trigger the following statement:
            return portfolioData;  //We have to return the portfolioData in the else statement explicitly so that the object is returned. This is a critical step to retrieving the user's answer and building an HTML template.
        }
    });
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });