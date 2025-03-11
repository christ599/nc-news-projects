const {selectArticleById} = require("../models/article.models")

exports.getArticleById = (request, response, next)=>{
    console.log("hello")
    const {article_id} = request.params
    console.log(article_id)
    selectArticleById(article_id)
    .then((article)=>{
        response.status(200).send({article})

    })
    .catch((err)=>{
        next(err)
    })

}