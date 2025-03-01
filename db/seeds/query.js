const db = require("../connection")

// Get all of the users 
db.query('SELECT * FROM users')
.then((response)=>{
    console.log(response.rows)
   
})

// Get all of the articles where the topic is coding


// Get all of the comments where the votes are less than zero
db.query('SELECT * FROM comments WHERE votes <0')
.then((response)=>{
    console.log(response.rows)
})

// Get all of the topics
db.query('SELECT * FROM topics')
.then((response)=>{
    console.log(response.rows)
   
})

// Get all of the articles by user grumpy19


// Get all of the comments that have more than 10 votes.
db.query('SELECT * FROM comments WHERE votes > 10')
.then((response)=>{
    console.log(response.rows)
    db.end()

 })   
   