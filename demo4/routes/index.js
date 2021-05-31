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

router.post('/insert', function(req, res) {
  let user_id = req.body.user_id;
  let title = req.body.article_title;
  let content = req.body.article_content;
  let time = req.body.article_date;
  console.log(user_id);
  var qu = [user_id,title,content,time];
  var query1 ='insert into articles(user_id,article_title,article_content,article_date) values(?,?,?,?)';
  db.query(query1,qu,(err,result,fields)=>{
    if(err) throw err;
    console.log(result);
    res.redirect('/design');
  })
});

router.get('/design', function(req, res, next) {
  db.query('select * from articles',(err,results,fields)=>{
    console.log(results);
    if(results!=""){
      res.render('design',{
        data:results
      });
    }
  })
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

router.get('/del/:id',(req,res)=>{
  delid = req.params.id;
  console.log(delid);
  var sql = "delete from articles where article_id='"+delid+"'";
  db.query("select * from articles limit 1",(err,results,fields)=>{
    console.log(results);
    db.query(sql,(err,results,field)=>{
      if(err) throw err;
        console.log(results);
        res.redirect('/design');
    })
    
  })
})
let pas;
router.get('/update/:id',(req,res)=>{
  pas = req.params.id;
  console.log(req.params.id)
  db.query("select * from articles where article_id='"+ pas +"'",(err,result,field)=>{
    console.log(result);
    res.render('update',{
    obj:result[0]
    });
  })
})

router.post('/update',(req,res)=>{
  console.log(pas);
  let user_id = req.body.user_id;
  let title = req.body.article_title;
  let content = req.body.article_content;
  let time = req.body.article_date;
  db.query("update articles set user_id=? ,article_title=? ,article_content=? ,article_date=? where article_id='"+pas+"'",[user_id,title,content,time],(err,result,field)=>{
    console.log(result);
    res.redirect('/design');
  })
})


router.post('/search',(req,res)=>{
  let su = req.body.title;
  console.log(su);
  let sql = "select * from articles where article_title like '%"+su+"%'";
  db.query(sql,(err,results,fields)=>{
      console.log(results);
      if(results!=""){
      res.render('design',{data:results})
      }else console.log(err)
  })
})

module.exports = router;
