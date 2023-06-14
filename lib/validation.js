"use strict";
/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const email_validator_1 = __importDefault(require("email-validator"));
const dns_1 = __importDefault(require("dns"));
async function validateEmailAddresses(inputPath, outputFile) {
    let fetchedArray = [];
    let mails = '';
    const validEmails = [];
    const count = 0;
    const domainArray = [];
    const finalArray = [];
    const removedEmail = [];
    let removedEmail1 = '';
    for (let i = 0; i < inputPath.length; i++) {
        fs_1.default.readFile(inputPath[i], 'utf-8', async (err, data) => {
            for (let j = 0; j < data.length; j++) {
                mails += data[j];
            }
            fetchedArray = mails.split('\n');
            removedEmail.push(fetchedArray[0]);
            removedEmail1 = removedEmail.join('');
            removedEmail1;
            for (let k = 0; k < fetchedArray.length; k++) {
                if (email_validator_1.default.validate(fetchedArray[k]) === true) {
                    validEmails.push(fetchedArray[k]);
                }
            }
            const mappedArray = validEmails.map((mail1) => mail1.split('@'));
            const mapped2 = mappedArray.map(([name, domain]) => domainArray.push(domain));
            async function afunc1() {
                const when1 = async (domain) => {
                    return new Promise((resolve, reject) => {
                        {
                            dns_1.default.resolveMx(domain, (err, addresses) => {
                                if (err) {
                                    resolve(false);
                                }
                                resolve(true);
                            });
                        }
                    });
                };
                for (let l = 0; l < domainArray.length; l++) {
                    console.log(await when1(domainArray[l]));
                    if ((await when1(domainArray[l])) === true) {
                        finalArray.push(domainArray[l]);
                    }
                }
                finalArray.unshift(removedEmail1);
                const output = finalArray.join('\n');
                output;
                fs_1.default.writeFile(outputFile, output, 'utf-8', (err) => {
                    if (err)
                        console.log(err);
                    else
                        console.log('Result Saved');
                });
            }
            console.log(await afunc1());
            console.log('Complete the implementation in src/validation.ts');
        });
    }
}
validateEmailAddresses([
    '/Users/decagon/Desktop/Tasks/Week 4/week-4-task-Alende5448/task-two/fixtures/inputs/small-sample.csv',
], 'test1.csv');
exports.default = validateEmailAddresses;
