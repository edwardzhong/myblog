var commentModel=require('../models/comment');
var	BaseDao=require('./baseDao');
var util=require('util');
var Q=require('q');

 function commentDao (entity) {
	BaseDao.call(this,commentModel,entity||{});
}
util.inherits(commentDao, BaseDao);

module.exports=new commentDao();
