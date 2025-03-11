exports.handleNonExistingEndpoint = (request, response)=>{
    response.status(404).send({msg:"path not valid"})

}