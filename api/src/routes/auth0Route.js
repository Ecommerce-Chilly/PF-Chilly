const axios = require("axios");

const options = { 
  method: "GET",
  url: "http://path_to_your_api/",
  headers: { "authorization": "Bearer TOKEN" },
};

axios(options)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });









