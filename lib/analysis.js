"use strict";
/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const email_validator_1 = __importDefault(require("email-validator"));
function analyseFiles(inputPaths, outputPath) {
    const finalOutput = {
        valid_domains: [],
        totalEmailsParsed: 0,
        totalValidEmails: 0,
        categories: {},
    };
    let fetchedArray = [];
    let mails = '';
    const validEmails = [];
    const domainArray = [];
    const categories = {};
    for (let i = 0; i < inputPaths.length; i++) {
        fs_1.default.readFile(inputPaths[i], 'utf-8', (err, data) => {
            for (let j = 0; j < data.length; j++) {
                mails += data[j];
            }
            fetchedArray = mails.split('\n');
            fetchedArray.shift();
            for (let k = 0; k < fetchedArray.length; k++) {
                if (email_validator_1.default.validate(fetchedArray[k]) === true) {
                    validEmails.push(fetchedArray[k]);
                }
            }
            const mappedArray = validEmails.map((mail1) => mail1.split('@'));
            const mapped2 = mappedArray.map(([name, domain]) => domainArray.push(domain));
            for (let l = 0; l < domainArray.length; l++)
                // eslint-disable-next-line no-prototype-builtins
                if (categories.hasOwnProperty(domainArray[l])) {
                    categories[domainArray[l]]++;
                }
                else {
                    categories[domainArray[l]] = 1;
                }
            finalOutput['valid_domains'] = domainArray;
            finalOutput['totalEmailsParsed'] = fetchedArray.length;
            finalOutput['totalValidEmails'] = validEmails.length;
            finalOutput['categories'] = categories;
            console.log(finalOutput);
            fs_1.default.writeFile(outputPath, JSON.stringify(finalOutput), 'utf-8', (err) => {
                if (err)
                    console.log(err);
                else
                    console.log('Result Saved');
            });
        });
    }
    console.log('Complete the implementation in src/analysis.ts');
}
analyseFiles([
    '/Users/decagon/Desktop/Tasks/Week 4/week-4-task-Alende5448/task-two/fixtures/inputs/small-sample.csv',
], 'test.json');
exports.default = analyseFiles;
