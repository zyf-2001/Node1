var express = require('express');
var router = express.Router();
var db = require('../mysql/mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/about', function(req, res, next) {
  res.render('about');
});
router.get('/admission', function(req, res, next) {
  res.render('admission');
});
router.get('/reg', function(req, res, next) {
  res.render('reg');
});
router.get('/contact', function(req, res, next) {
  res.render('contact');
});
router.get('/why', function(req, res, next) {
  res.render('why');
});
router.get('/index', function(req, res, next) {
  res.render('index');
});


router.post('/login',(req,res)=>{
  var Eamil = req.body.Eamil
  var password = req.body.password
  var query1 = "select * from users where user_email='"+Eamil+"' and user_password='"+password+"'"
  db.query(query1,function(err,result){
      console.log(result);
      if(result ==""){
       res.send('email或password错误')
      }else{res.render('index')}
  })
})

router.post('/reg',(req,res)=>{
  var username = req.body.username;
  var Eamil = req.body.Eamil;
  var password = req.body.password;
  var repassword = req.body.repassword;
  var user = [username,password,Eamil];
  console.log(user);
  var query1 = 'insert into users(user_name,user_email,user_password) values(?,?,?)';
  db.query(query1,user,function(err,result){
  console.log(result);
  if(password==repassword){
    res.render('login')
  }else{res.render('login')}
  })
})

module.exports = router;
