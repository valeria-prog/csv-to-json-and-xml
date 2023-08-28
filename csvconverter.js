const fs= require('fs');

if (process.argv[2]===undefined){
    console.error('usage: node csvconverter.js <file.csv>')
    process.exit(1)
}
const filename = process.argv[2];
const fileText = fs.readFileSync(filename).toString();
const allLines = fileText.split('\n');

const header = allLines[0];
const dataLines = allLines.slice(1);

const fieldNames = header.split(',');

let objList = [];
for (let i=0; i < dataLines.length; i++ ){
    let obj={};
    const data = dataLines[i].split(',');
    for(let j=0; j<fieldNames.length; j++){
        const fieldName= fieldNames[j].toLowerCase();
        obj[fieldName]= data[j];
    }
    objList.push(obj);
}

const jsonText= JSON.stringify(objList);
const outputFilename = filename.replace(".csv", ".json");
fs.writeFileSync(outputFilename, jsonText);