exports.handleNonExistingEndpoint = (request, response)=>{
    response.status(404).send({msg:"path not valid"})

}
exports.handlePsqErrors = (err, req, res, next)=>{
    if (err.code === '22P02' || err.code ==='23503'){
      res.status(400).send({ msg: 'bad request'})
    }
    next(err)

  };
  exports.handleInvalidIds = (err, req, res, next)=>{
    if (err.code ==='23503'){
      res.status(400).send({ msg: 'not found'})
    }
    next(err)

  };
  
  exports.handleCustomErrors = (err, req, res, next)=>{
      if (err.status && err.msg){
        res.status(err.status).send({ msg:err.msg})
      }
      next(err)
    };
    exports.handleServerErrors = (err, req, res, next)=>{
        res.status(500).send({ msg:"something broke"})
    };
