// import
const fs = require('fs');
const util = require('util');

// promisify fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 *  function for desired destination and desired content.
 *  @param {string} destination 
 *  @param {object} content 
 *  @returns {void} 
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 * Append content to desired file.
 *  @param {object} content 
 *  @param {string} file 
 *  @returns {void} 
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });

 
};
// export
module.exports = { readFromFile, writeToFile, readAndAppend };