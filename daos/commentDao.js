var commentModel=require('../models/comment');
var	BaseDao=require('./baseDao');
var util=require('util');

 function commentDao (entity) {
	BaseDao.call(this,commentModel,entity||{});
}
util.inherits(commentDao, BaseDao);

module.exports=new commentDao();
