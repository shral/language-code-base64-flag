#!/usr/bin/env node



/**
 * @author Shefki Esadi <shralsheki@gmail.com>
 * @since 28.02.2020
 */

const fs = require('fs');
const util = require('util');
const _ = require('lodash');


const textDecoder = new util.TextDecoder('utf-8');
let rawdata = fs.readFileSync('./base64flags.json');
let flags = JSON.parse(textDecoder.decode(rawdata));
let rawdata2 = fs.readFileSync('./languageCodes.json');
let languageCodes = JSON.parse(textDecoder.decode(rawdata2));
let rawdata3 = fs.readFileSync('./cuntrytolanguagemap.json');
let codeMap = JSON.parse(textDecoder.decode(rawdata3));

let newObject = {};
Object.keys(languageCodes).forEach(code=>{
    Object.keys(codeMap).forEach(countryCodeMap=>{
        if(codeMap[countryCodeMap].indexOf(code) > -1){
            if(_.hasIn(flags,countryCodeMap)){
                newObject[code] = languageCodes[code];
                newObject[code]["code"] = code;
                newObject[code]["countryCode"] = flags[countryCodeMap]["code"];
                newObject[code]["base64OfFlag"] = flags[countryCodeMap]["flag"];
                newObject[code]["flag"] = `data:image/gif;base64,${flags[countryCodeMap]["flag"]}`;
            }
        }
    });
})
// console.log(JSON.stringify(newObject));
fs.writeFile("languageCodeBase64Flag.json", JSON.stringify(newObject, null, 4), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});