const db = require("../db/connection");
exports.insertComments = (article_id,comment)=>{
    console.log(comment, "comments")
    //comment.article_id = id;
    const {body, username} = comment
    return db
        .query(
            `INSERT INTO comments
            (article_id, body, author) 
            VALUES 
            ($1, $2, $3) 
            RETURNING *`,[article_id, body, username]).then(({rows})=>{
                
           return rows[0]
    })

}