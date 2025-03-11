const endpoints = require("../endpoints.json")

exports.getEndpoints = (request,response)=>{

    console.log("controller invoked")

   response.status(200).send({endpoints:endpoints})


}

