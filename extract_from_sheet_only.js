const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./client_secret.json');
const fs = require('fs');
const doc = new GoogleSpreadsheet('1oU7yFzCXEsvg6dhVnp9n9-eaXJB0KPMUYi--6RTwlzU');

const axios = require('axios');
// /repos/:owner/:repo/topics
var x = [];
doc.useServiceAccountAuth(creds, function (err) {
  let count = 1;
  doc.getRows(1, function async (err, rows) {
    let keys = Object.keys(rows[0]);
    let useful_keys = keys.slice(4, -2);
    for (let row of rows) {
      let row_data = {};
      let mentor = row.repositorylink.split('/')[3];
      let repo = row.repositorylink.split('/')[4];
      function beasync() {
        return axios
        .get(`https://api.github.com/repos/${mentor}/${repo}`, {headers: { 'Accept':  "application/vnd.github.mercy-preview+json"}})
        .then(res => row_data['tag'] = res.data.topics)
        
      }
      beasync().then(res => {
        row_data['tag'] = res.data.topics
      }).catch(err => row_data['tag'] = []);

      // axios
      // .get(`https://api.github.com/repos/${mentor}/${repo}`, {headers: { 'Accept':  "application/vnd.github.mercy-preview+json"}})
      // .then(res => {
      //     row_data['tag'] =  res.data.topics;
      //   })
      // .catch(err => {
      //   row_data['tag'] = [];
      // })
       

    
      // axios.get(`https://api.github.com/repos/${mentor}/${repo}`, {headers: { 'Accept':  "application/vnd.github.mercy-preview+json"}})
      //       .then(res => {
      //         row_data['intro_full'] = res.data.description;
      //       })
      //       .catch(err => {
      //         row_data['intro_full'] = row['projectdescriptionshort']
      //       })
     
      
     
      
      row_data['title'] = row['projectname'];
      row_data['id'] = count;
      row_data['btnid'] = 1000 + count;
      row_data['intro'] = row['projectdescriptionshort'];
      row_data['mentor'] = row['fullname'];
      row_data['mentor_email'] = row['emailid'];
      row_data['comm'] = row['communicationchannelinvitelink'];
      row_data['link'] = row['repositorylink'];
      row_data['img'] = `https://github.com/${mentor}.png?size=50`
    
      count++;
    row_data = JSON.stringify(row_data);
    // console.log('each ', row_data);
    x.push(row_data);
    // fs.writeFile('stage1.js', x, (err) => console.log(err));
      console.log(x);
    }
  });
});
