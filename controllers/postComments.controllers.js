const {insertComments} = require("../models/insertComments.models")

exports.postComments = (request, response, next)=>{
    const { article_id } = request.params;

    console.log(request.body, "<<<< request body")
    const newComment = request.body
    console.log(newComment, "newComments")
    if (!request.body) {
        return response.status(400).send({ msg: 'Bad Request: Missing required fields.' });
      }
    insertComments(article_id, newComment)
    .then((comments)=>{

         response.status(201).send({comments})

    })
    .catch((err)=>{
        console.log(err, "error")
        next(err)
    })
}