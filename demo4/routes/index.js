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
router.get('/blog', function(req, res, next) {
  res.render('blog');
});
router.get('/reg', function(req, res, next) {
  res.render('reg');
});
router.get('/contact', function(req, res, next) {
  res.render('contact');
});
router.get('/support', function(req, res, next) {
  res.render('support');
});
router.get('/index', function(req, res, next) {
  res.render('index');
});
router.get('/forgot', function(req, res, next) {
  res.render('forgot');
});
router.get('/ht', function(req, res, next) {
  res.render('ht');
});
router.get('/insert', function(req, res, next) {
  res.render('insert');
});
router.get('/design', function(req, res, next) {
  res.render('design');
});

router.post('/login',(req,res)=>{
  var Eamil = req.body.Eamil
  var password = req.body.password
  var query1 = "select * from users where user_email='"+Eamil+"' and user_password='"+password+"'"
  db.query(query1,function(err,result,fields){
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
  var query1 = 'insert into users(user_name,user_password,user_email) values(?,?,?)';
  db.query(query1,user,(err,result,field)=>{
  console.log(result);
  if(password==repassword&result!=""){
    res.render('login')
  }else{res.send('密码不一致')}
  })
})

/*router.post('/forgot',(req,res)=>{
  var username = req.body.username;
  var Eamil = req.body.Eamil;
  var Newpassword = req.body.Newpassword;
  var Newrepassword = req.body.Newrepassword;
  var user = [username,Newpassword,Eamil];
  console.log(user);
  var query1 = 'insert into users(user_name,user_password,user_email) values(?,?,?)';
  db.query(query1,user,(err,result,field)=>{
  console.log(result);


  })
})*/
module.exports = router;
