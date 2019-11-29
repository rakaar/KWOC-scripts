var x = require('./stage2');

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
      // console.log('dam ', res.data.topics);
      x1.push({
        ...ele,
        "intro_full": res.data.description 
      })
    })
    .catch(err => {
      console.log(err);
      x1.push({
        ...ele,
        "intro_full": ele.projectdescriptionshort
      })
    })
})

fs.writeFile('stage3.js', x1, err => console.log(err));