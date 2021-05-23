// var express = require('express');
// var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host:'localhost',
  port:'3306',
  user:'root',
  password:'123456',
  database:'demo4'
})

connection.connect((err)=>{
  if(err) throw err;
  console.log("mysql链接成功");
})


module.exports=connection;