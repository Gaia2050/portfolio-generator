const fs = require('fs');
const { reject } = require('lodash');
const { resolve } = require('path/posix');
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('.dist/index.html', fileContent, err => {
            //if there is an error, reject the promise and send error to the promise's '.catch()' method
            if (err) {
                reject(err);
                //return out fo the function here to make sure the promise does not accidentally execute the resolve() function as well 
                return;
            }
            //if everything went well, resolve the promise and send the successful data to the '.then()' method
            resolve({
                ok: true,
                message: 'File Created!'
            });
        });
    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('/src/style.css', '.dist/style.css', err => {
            if(err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'Stylesheet Created!'
            });
        });
    });
};


module.exports = {
    writeFile: writeFile,
    copyFile: copyFile
};