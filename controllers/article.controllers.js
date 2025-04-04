const {selectArticleById} = require("../models/article.models")

exports.getArticleById = (request, response, next)=>{
    const {article_id} = request.params
    selectArticleById(article_id)
    .then((article)=>{
        response.status(200).send({article})

    })
    .catch((err)=>{
        next(err)
    })
}