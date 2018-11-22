const  express=require('express');
const app=express();
const db=require('./model/db.js')
const ejs=require('ejs');
app.set('view engine','ejs');
var session = require('express-session')
// 持久化
var NedbStore = require('nedb-session-store')( session );
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{
  	maxAge:20000000
  },
  // 配置持久化
  store: new NedbStore({
      filename: 'path_to_nedb_persistence_file.db'
    })
}))

app.use(`/public`,express.static('./public/'))

app.get('/',(req,res)=>{
	console.log(req.session.user)
	if(req.session.login){

		res.render('room')
	}else{
		res.render('login')
	}
	
})	
//跳转到注册页面
app.get('/register',(req,res)=>{
	res.render('register')
})

//注册
app.get(`/user`,(req,res)=>{
	var user=req.query.param1;
	var pass=req.query.pass;
	console.log(pass)
	db.find('blog','person',{name:user},res,function(res1){
		console.log(res1)
		if(res1.length==0){
			if(pass){
				db.insert('blog','person',{name:user,pass:pass},res,function(){
					res.send({"status":"数据插入成功"})
				})
			}else{
				res.send({"status":"ok"});
			}
			
		}else{
			res.send({"status":"用户名已存在"})
		}
	})
})

//登陆
app.get(`/onuse`,(req,res)=>{
	
	var user = req.query.param1;
	console.log(user)
	var onpass =req.query.pass1;
	console.log(onpass)
	req.session.user=user;
	req.session.login=true;
	db.find('blog','person',{name:user},res,function(res1){
		console.log(res1)
		if(res1.length!=0){
			var pass1 = res1[0].pass;
			if(onpass==pass1){
				res.send({"status":"密码正确"})
			}else if (onpass!=pass1){
				res.send({"status":"ok"})
			}
		}
		else{
			res.send({"status":"no"})
		}
		})

    })

//我的文章
app.get('/myblog',(req,res)=>{
	console.log(req.session.user)
	// console.log(res.session.user)
	if(req.session.login){
		db.find('article','page',{name:req.session.user},res,function(res1){
			console.log(res1)
            res.render('myblog',{user:req.session.user,list:res1})
		})
		
	}else{
		res.render('login')
	}
	
})	

//发博客
app.get('/content',(req,res)=>{
	var title = req.query.title1
	var text = req.query.text1
	var user = req.session.user
	console.log(user)
	console.log(title)
	console.log(text)
	var date = new Date()
	var day = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'-'+ 
	date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
	console.log(day)	
	var obj ={name:user,title:title,text:text,date:day}
	db.insert('article','page',obj,res,function(){
		res.send({'status':'ok'})
	})
	            
})


app.get('/add',(req,res)=>{
	res.render('room')
})

//退出登陆
app.get('/quit',(req,res)=>{
	req.session.user=null;
	req.session.login=false;
	res.redirect('http://localhost:8989/')
})




app.listen('8989')