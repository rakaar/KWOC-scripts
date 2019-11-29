var x = require('./stage1');

const axios = require('axios');

const getTopics = (ele) => {
    // console.log("waibabababa",ele);
    let mentor = ele['link'].split('/')[3];
    let repo = ele['link'].split('/')[4];
    
    // let link = `https://api.github.com/repos/${mentor}/${repo}`;
    let link = "http://api.github.com/repos/octocat/Hello-World"


    axios
      .get(link , {headers: { 'Accept':  "application/vnd.github.mercy-preview+json", 'rakaar': 'f8cd4b6cf61ccddfabfd1db51f21d37cf33ce9e8 '}})
      .then(async res => {    
        //   row_data['tag'] =  res.data.topics;
        let yo = await res.data
        console.log(yo);
        console.log('\n')
        })
      .catch(err => {
       console.log(err);
       console.log('\n')
      })
} 

x.forEach(ele => {
    getTopics(ele)
})

