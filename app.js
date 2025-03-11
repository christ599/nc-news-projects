const express = require("express");
const app = express()
const {getEndpoints} = require("./controllers/api.controllers");


app.get("/api", getEndpoints);



module.exports = app