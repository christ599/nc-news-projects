const express = require("express");
const app = express()
const {getEndpoints} = require("./controllers/api.controllers");
const {getTopics} = require("./controllers/topics.contrllers");
const {getArticleById} = require("./controllers/article.controllers");
const {handleNonExistingEndpoint, handlePsqErrors, handleCustomErrors, handleServerErrors
       } = require("./controllers/errors.controllers");


app.get('/api', getEndpoints);
app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticleById);

app.all('/*', handleNonExistingEndpoint)

app.use(handlePsqErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

app.use((err, request, response, next)=>{
    response.status(500).send({msg:"internal server error"})
})




module.exports = app