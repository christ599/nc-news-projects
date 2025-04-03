const express = require("express");
const cors = require('cors');
const app = express()
const {getEndpoints} = require("./controllers/api.controllers");
const {getTopics} = require("./controllers/topics.contrllers");
const {handleNonExistingEndpoint, handleInvalidIds} = require("./controllers/errors.controllers");
const {getArticleById} = require("./controllers/article.controllers");
const {getArticles} = require("./controllers/articles.controllers");
const {getComments} = require("./controllers/comments.controllers");
const {postComments} = require("./controllers/postComments.controllers");
 const {handlePsqErrors, handleCustomErrors, handleServerErrors
        } = require("./controllers/errors.controllers");
        
app.use(cors());
app.use(express.json())
app.get('/api', getEndpoints);
app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/articles', getArticles);
app.get('/api/articles/:article_id/comments', getComments);
app.post('/api/articles/:article_id/comments', postComments);


app.all('*', handleNonExistingEndpoint)
 app.use(handleInvalidIds)
 app.use(handlePsqErrors);
 app.use(handleCustomErrors);
 app.use(handleServerErrors);

/*app.use((err, request, response, next)=>{
    response.status(500).send({msg:"internal server error"})
})*/




module.exports = app