var userDao=require('../daos/userDao')
	,logger = require('../log').logger
	,fs=require('fs')
	,Q=require('q');

exports.login = function(req,res){
	var name=req.body.userName
		,pass=req.body.password;
	if(!name){
		res.json({isOk:false,err:'用户名不能为空'});
	}
	if(!pass){
		res.json({isOk:false,err:'密码不能为空'});
	}
	return userDao().findOne({'$or':[{userName:name},{email:name}]}).then(function(user){
		if(user){
			if(user.authenticate(pass)){
				req.session.user={userName:user.userName,password:pass,id:user._id};
				res.json({isOk:true});
			}else{
				res.json({isOk:false,err:'密码错误'});
			}
		}else{
			res.json({isOk:false,err:'用户名错误'});
		}
	},function(err){
		logger.info(err);
		res.json({isOk:false,err:err.toString()});
	});
};
exports.reg=function(req,res){
	var form=req.body;
	var msg=validateForm(form);
	if(msg){
		return res.json({isOk:false,err:msg});
	}
	return userDao().count({'$or':[{userName:form.userName},{email:form.email}]})
	.then(function(counts){
		if(counts){
			res.json({isOk:false,err:'用户名或邮箱已经被注册'});
		}else{
			return userDao().create(form).then(function(data){
				res.json({isOk:true,err:null});
			});
		}
	})
	.fail(function(err){
		logger.info(err);
		res.json({isOk:false,err:err.toString()});
	});
};
exports.isLogin=function(req,res){
	var user=req.session.user;
	res.json({
		isOk:user!==null,
		user:user||null
	});
};
exports.logOut=function(req,res){
	req.session.user=null;
	res.redirect('/');
};
exports.nameValid=function(req,res){
	var name=req.params.name;
	return userDao().count({'$or':[{userName:name},{email:name}]}).then(function(counts){
		if(counts){
			res.json({isValid:true});
		}else{
			res.json({isValid:false});
		}
	},function(err){
		logger.info(err);
		res.json({isValid:false,err:err.toString()});
	});
};
exports.getUserInfo=function(req,res){
	var name=req.params.name;
	return userDao().findOne({userName:name}).then(function(user){
		res.json({isOk:true,user:user});
	},function(err){
		logger.info(err);
		res.json({isOk:false,err:err.toString()});
	});
};
exports.updateUser=function(req,res){
	var form=req.body;
	return userDao().update(
		{_id:form._id},
		{	
			email:form.email,
			phone:form.phone,
			gender:form.gender,
			temp:form.temp,
			nickName:form.nickName,
			blogName:form.blogName,
			myWord:form.myWord
		}
		).then(function(data){
			res.json({isOk:true});
		},function(err){
			logger.info(err);
			res.json({isOk:false,err:err.toString()});
		});
};
//上传文件
exports.upload=function(req,res){
	var files=req.files
		,rename=Q.denodeify(fs.rename)
		,f,arr=[],tPath='';
	for(f in files){
		tPath='public/upload/'+files[f].name;
		arr.push(rename(files[f].path,tPath));//重命名为原文件名
	}
	Q.all(arr).spread(function(){
		res.json({isOk:true});
	},function(err){
		logger.info(err);
		res.json({isOk:false,err:err.toString()});
	});
};
//注册验证
function validateForm(form){
	var msg='';
	switch(true){
		case !form.userName:msg='用户名不能为空';break;
		case !form.password:msg='密码不能为空';break;
		case form.password!==form.password2:msg='两次密码不一致';break;
		case !/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(form.email):msg='邮箱格式不正确';break;
		default:break;
	}
	return msg;
}