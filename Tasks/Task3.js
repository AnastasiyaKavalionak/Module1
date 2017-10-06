'use strict';


function convertor(inputDir, outputDir) {

    const Excel = require('exceljs');
    const workbook = new Excel.Workbook();
    const fs = require('fs');
    const path = require('path');
    const p = './files';
    let sheets = [];
    let jsons = [];

    fs.readdir(p, function (err, files) {
        for (let i = 0; i < files.length; i++) {
            if (files[i].indexOf('.json') > 0) {
                jsons.push(require(files[i]));
            }
        }
        for (let i = 0; i < jsons.length; i++) {
            sheets.push(workbook.addWorksheet('Sheet' + i));
            formExcel(jsons[i], 0, sheets[i]);
        }
        workbook.xlsx.writeFile(outputDir + '/json.xlsx');
    });
}

    function formExcel(obj, counter, sheet) {

        let former = [];
        for (let i = 0; i < counter; i++){
            former.push('');
        }
        for (let key in obj){
            former.push(key);
            sheet.addRow(former);
            former.pop();
            former.push('');
            if (typeof obj[key] === 'object') {
                if (Array.isArray(obj[key])){
                    for ( let i = 0; i < obj[key].length; i++){
                        if (typeof obj[key][i] !== 'object') {
                            former.push(obj[key][i]);
                            sheet.addRow(former);
                            former.pop();
                        } else {
                            formExcel(obj[key][i], counter + 1);
                        }
                    }
                } else {
                    formExcel(obj[key], counter + 1);
                }
            } else {
                former.push(obj[key]);
                sheet.addRow(former);
                former.pop();
            }
            former.pop();
        }
    }

convertor('./files', './files');