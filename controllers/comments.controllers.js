const {selectComments} = require("../models/comments.models")
const {selectArticleById} = require("../models/article.models")
exports.getComments = (request, response, next)=>{
    const {article_id} = request.params
    selectArticleById(article_id).then(()=>{
        return selectComments(article_id)
    })
    .then((comments)=>{
        response.status(200).send({comments})
    })
    .catch((err)=>{
        next(err)
    })
}