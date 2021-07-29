const request = require('request');
const fs = require('fs');
const webpageStr = process.argv[2];
const pathToSave = process.argv[3];
// const stdin = process.stdin;
// stdin.setRawMode(true);
// stdin.setEncoding('utf8');
let errCheck = false;


// Below code is to catch and see if there's an issue with the file path:
try {
  const refCheck = require(pathToSave);
}
catch(err) {
  console.log(`Invalid pathing entered.`)
  errCheck = true;
}

if (errCheck) {
  // Code will not run.
} else {

  request(webpageStr, (error, response, body) => {
  
    if(response.statusCode === 200) {
      fs.writeFile(pathToSave, body, err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
        console.log(`Downloaded and saved ${body.length} bytes to ./index.html`);
      })
    } else {
      console.log(`The URL returns ${response.statusCode} status code.`);
    }
  
  });
}

