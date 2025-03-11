const db = require("../db/connection");
exports.selectTopics = ()=>{
    console.log("hi from the models")
    return db.query(`SELECT * FROM topics`).then(({rows})=>{
           return rows
    })

}