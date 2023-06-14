/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */

import fs from 'fs';
import emailValidator from 'email-validator';
import dns from 'dns';

function analyseFiles(inputPaths: string[], outputPath: string) {
  interface Total {
    valid_domains: string[];
    totalEmailsParsed: number;
    totalValidEmails: number;
    categories: Record<string, number>;
  }

  const finalOutput: Total = {
    valid_domains: [],
    totalEmailsParsed: 0,
    totalValidEmails: 0,
    categories: {},
  };
  let fetchedArray: string[] = [];
  let mails = '';
  const validEmails: string[] = [];
  const domainArray: string[] = [];
  const categories: Record<string, number> = {};

  for (let i = 0; i < inputPaths.length; i++) {
    fs.readFile(inputPaths[i], 'utf-8', (err, data) => {
      for (let j = 0; j < data.length; j++) {
        mails += data[j];
      }

      fetchedArray = mails.split('\n');
      fetchedArray.shift();

      for (let k = 0; k < fetchedArray.length; k++) {
        if (emailValidator.validate(fetchedArray[k]) === true) {
          validEmails.push(fetchedArray[k]);
        }
      }

      const mappedArray = validEmails.map((mail1) => mail1.split('@'));

      const mapped2 = mappedArray.map(([name, domain]) =>
        domainArray.push(domain),
      );

      for (let l = 0; l < domainArray.length; l++)
        // eslint-disable-next-line no-prototype-builtins
        if (categories.hasOwnProperty(domainArray[l])) {
          categories[domainArray[l]]++;
        } else {
          categories[domainArray[l]] = 1;
        }

      finalOutput['valid_domains'] = domainArray;
      finalOutput['totalEmailsParsed'] = fetchedArray.length;
      finalOutput['totalValidEmails'] = validEmails.length;
      finalOutput['categories'] = categories;

      console.log(finalOutput);

      fs.writeFile(outputPath, JSON.stringify(finalOutput), 'utf-8', (err) => {
        if (err) console.log(err);
        else console.log('Result Saved');
      });
    });
  }

  console.log('Complete the implementation in src/analysis.ts');
}
analyseFiles(
  [
    '/Users/decagon/Desktop/Tasks/Week 4/week-4-task-Alende5448/task-two/fixtures/inputs/small-sample.csv',
  ],
  'test.json',
);
export default analyseFiles;
