const express = require("express");
const app = express()
const {getEndpoints} = require("./controllers/api.controllers");
const {getTopics} = require("./controllers/topics.contrllers");
const {handleNonExistingEndpoint} = require("./controllers/errors.controllers");


app.get('/api', getEndpoints);
app.get('/api/topics', getTopics);

app.all('/*', handleNonExistingEndpoint)

app.use((err, request, response, next)=>{
    response.status(500).send({msg:"internal server error"})
})




module.exports = app