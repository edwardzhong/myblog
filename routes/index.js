var path=require('path');
var user=require('./user');
var article=require('./article');

module.exports=function(app){
	app.get('/',index);
	app.all('/admin',noLogin);
	app.get('/admin',admin);
	app.all('/login',hadLogin);
	app.post('/login',user.login);
	app.post('/reg',user.reg);
	app.get('/islogin',user.isLogin);
	app.all('/logout',noLogin);
	app.get('/logout',user.logOut);
	app.get('/nameValid/:name',user.nameValid);
	app.get('/articles',article.getArticles);
	app.get('/article/:id',article.getArticle);
	app.all('/saveArticle',noLogin);
	app.post('/saveArticle',article.saveArticle);
	app.all('/delArticle',noLogin);
	app.delete('/delArticle/:id',article.delArticle);
	app.all('/addComment',noLogin);
	app.post('/addComment',article.addComment);
	app.get('/user/:name',user.getUserInfo);
	app.all('/updateUser',noLogin);
	app.put('/updateUser',user.updateUser);
	app.all('/upload',noLogin);
	app.post('/upload',user.upload);
	app.use(noExist);
};

function index(req, res){
	var html = path.normalize(__dirname + '/../public/views/index.html');
	res.sendfile(html);
}

function admin(req,res){
	var html=path.normalize(__dirname + '/../public/views/admin.html');
	res.sendfile(html);
}
//404页面
function noExist(req,res){
	var html = path.normalize(__dirname + '/../public/views/404.html');
	res.sendfile(html);
}
//如果没有登录
function noLogin(req,res,next){
	if(!req.session.user){
		req.session.err='请先登录';
		return res.redirect('/#/login');
	}
	next();
}
//如果没有登出
function hadLogin(req,res,next){
	if(req.session.user){
		req.session.err='已经登录';
		return res.redirect('/');
	}
	next();
}