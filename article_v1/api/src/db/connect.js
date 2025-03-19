const mysql = require('mysql2');

// const pool = mysql.createPool({
//     connectionLimit:10,
//     host:'localhost',
//     user:'root',
//     password:'fr@nrobots',
//     database:'article'
// })

const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'alunods',
    password:'senai@604',
    database:'article'
})

module.exports = pool;
