const db = require("../db/connection");

exports.selectArticles = ()=>{

    return db.query(`SELECT 
            a.author, 
            a.title, 
            a.article_id, 
            a.topic, 
            a.created_at, 
            a.votes, 
            a.article_img_url,
            (SELECT COUNT(*) FROM comments c WHERE c.article_id = a.article_id) AS comment_count
        FROM articles a
        ORDER BY a.created_at DESC `).then(({rows})=>{

        return rows
    })
}