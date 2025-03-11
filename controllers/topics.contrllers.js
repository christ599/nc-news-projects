const {selectTopics} = require("../models/topics.models")

exports.getTopics = (request, response)=>{
    console.log("hello from the controllers")
    selectTopics().then((topics)=>{
        response.status(200).send({topics:topics})

    })

}