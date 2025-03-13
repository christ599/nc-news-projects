const {selectArticles} = require("../models/articles.models")

exports.getArticles = (request, response, next)=>{
    selectArticles()
    .then((article)=>{

         response.status(200).send({article})

    })
    .catch((err)=>{
        next(err)
    })
}