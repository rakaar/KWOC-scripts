var x = require('./stage1');

const axios = require('axios');
const fs = require('fs');
var x1 = [];
x.forEach(ele => {

  let mentor = ele.link.split('/')[3];
  let repo = ele.link.split('/')[4];
  // console.log('link is ',repo)
  axios
    .get(`https://api.github.com/repos/${mentor}/${repo}`, {headers: { 'Accept':  "application/vnd.github.mercy-preview+json"}})
    .then(res => {
      console.log('dam ', res.data.topics);
      x1.push({
        ...ele,
        "tag": res.data.topics 
      })
    })
    .catch(err => {
      console.log(err);
      x1.push({
        ...ele,
        "tag": []
      })
    })
})

fs.writeFile('stage2.js', x1, err => console.log(err));