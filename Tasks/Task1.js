'use strict';

const fs = require('fs');
let data = '';
let readerStream = fs.createReadStream('./files/text.txt');

readerStream.setEncoding('UTF8');

readerStream.on('data', chunk => {
    data = chunk;
});
readerStream.on('end', () => {
    let strings = data.split('\n');
    for (let i = 0; i < strings.length; i++) {
        if (i % 2 === 1) {
            console.log(strings[i]);
        }
    }
});
readerStream.on('error', err => {
    console.log(err.stack);
});

//second way
/*const readline = require('readline');
 const fs = require('fs');

 const rl = readline.createInterface({
 input: fs.createReadStream('./files/text.txt')
 });
 let count = 0;
 rl.on('line', (line) => {
 count++;
 if (count % 2 === 0) {
 console.log(`${line}`);
 }
 });*/