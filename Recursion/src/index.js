const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'data', 'books.json');

fs.readFile(jsonPath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Could not read the JSON file: ${err}`);
        return;
    }

    try {
        const jsonData = JSON.parse(data);
        recursivePrint(jsonData);
    } catch (parseError) {
        console.error(`Could not parse JSON data: ${parseError}`);
    }
});

function recursivePrint(obj, indent = '') {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                console.log(`${indent}${key}:`);
                recursivePrint(value, indent + '  ');
            } else if (Array.isArray(value)) {
                console.log(`${indent}${key}: [`);
                value.forEach((item, index) => {
                    console.log(`${indent}  [${index}]`);
                    recursivePrint(item, indent + '    ');
                });
                console.log(`${indent}]`);
            } else {
                console.log(`${indent}${key}: ${value}`);
            }
        }
    }
}
