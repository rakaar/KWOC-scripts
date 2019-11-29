const axios = require('axios');

const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./client_secret.json');

const BASE = 'https://github.com/'
username = 'chaman-chutuya-maki'

// read from list
const doc = new GoogleSpreadsheet('*spreadsheet ID*');
const new_doc = new GoogleSpreadsheet("");

// Authenticate with the Google Spreadsheets API.
doc.useServiceAccountAuth(creds, function (err) {

  
  doc.getRows(1, function (err, rows) {
for(let row of rows) {
  axios
    .get(BASE + row)
    .then(res => console.log(res.status)) // this will give 200
    .catch(err => {
        // get this guy's mail
        
        new_doc.useServiceAccountAuth(credds, err => {
            new_doc.addRow(1, { mail: row['mail'] }, function(err) {
                if(err) {
                  console.log(err);
                }
              });
        })
        
          
    })
    }

    
  });
});

// check if there
