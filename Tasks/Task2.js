'use strict';

const fs = require('fs');
const writerStream = fs.createWriteStream('./files/invalidValues.txt')
const obj = require('./files/3.json');
const objDefault = {"flag": true,
    "myPromises": [],
    "element": {},
    "screenshot": null,
    "elementText": '',
    "allElementsText": '',
    "counter": 10,
    "config": '',
    "const": '',
    "parameters": [],
    "description": ''
};

function checkJsonObject(obj, writerStream) {


    let flag = true;

    for (let key in obj) {
        if (typeof obj[key] === typeof objDefault[key]) {
            switch (key) {
                case 'myPromises':
                    if (!Array.isArray(obj[key])) {
                        flag = false;
                        writerStream.write(`${key} : ${obj[key]} \n`);
                    }
                    break;
                case 'screenshot':
                    if (obj[key] === null) {
                        flag = false;
                        writerStream.write(`${key} : ${obj[key]} \n`);
                    }
                    break;
                case 'allElementsText':
                    if (obj[key].indexOf('const') < 0) {
                        flag = false;
                        writerStream.write(`${key} : ${obj[key]} \n`);
                    }
                    break;
                case 'counter':
                    if (obj[key] <= 10) {
                        flag = false;
                        writerStream.write(`${key} : ${obj[key]} \n`);
                    }
                    break;
                case 'config':
                    if (obj[key] !== 'Common') {
                        flag = false;
                        writerStream.write(`${key} : ${obj[key]} \n`);
                    }
                    break;
                case 'const':
                    if (obj[key].toLowerCase() !== 'FiRst'.toLowerCase()) {
                        flag = false;
                        writerStream.write(`${key} : ${obj[key]} \n`);
                    }
                    break;
                case 'parameters':
                    if (obj[key].length != 8) {
                        flag = false;
                        writerStream.write(`${key} : ${obj[key]} \n`);
                    }
                    break;
                case 'description':
                    if (obj[key].length <= 5 || obj[key].length >= 13) {
                        flag = false;
                        writerStream.write(`${key} : ${obj[key]} \n`);
                    }
                    break;
            }
        } else {
            flag = false;
            writerStream.write(`${key} : ${obj[key]}`);
        }
    }
    writerStream.end();
    if (flag) {
        console.log('Ok');
    }
}

checkJsonObject(obj, writerStream);
