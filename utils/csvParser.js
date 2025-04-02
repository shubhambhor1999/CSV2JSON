const fs = require("fs");
const readline = require("readline");

function expandKeys(obj) {
  let result = {};
  Object.keys(obj).forEach((key) => {
    let keys = key.split(".");
    keys.reduce((acc, curr, index) => {
      if (index === keys.length - 1) {
        acc[curr] = obj[key];
      } else {
        acc[curr] = acc[curr] || {};
      }
      return acc[curr];
    }, result);
  });
  return result;
}

async function parseCsv(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({ input: fileStream });

  let headers = [];
  let records = [];
  let isHeader = true;

  for await (const line of rl) {
    const values = line.split(",");
    if (isHeader) {
      headers = values;
      isHeader = false;
    } else {
      let obj = {};
      headers.forEach((key, index) => {
        obj[key] = values[index];
      });
      records.push(expandKeys(obj));
    }
  }

  console.log("CSV Parsed Successfully!");
  return records;
}

module.exports = { parseCsv };
