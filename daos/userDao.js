var userModel=require('../models/user');
var	BaseDao=require('./baseDao');
var util=require('util');

 function UserDao (entity) {
	if(this instanceof UserDao){
		BaseDao.call(this,userModel,entity||{});
	}else{
		return new UserDao();
	}
}
util.inherits(UserDao, BaseDao);
module.exports=UserDao;
