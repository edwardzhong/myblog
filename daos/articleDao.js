var articleModel = require('../models/article');
var BaseDao = require('./baseDao');
var util = require('util');
var Q = require('q');

function articleDao(entity) {
	BaseDao.call(this, articleModel, entity || {});
}
util.inherits(articleDao, BaseDao);
//重写分页
articleDao.prototype.getPage = function (query, pageQuery, callback) {
	var deferred = Q.defer();
	var page = pageQuery.page,
		size = pageQuery.size,
		total = 0;
	articleModel.count(query, function (err, counts) {
		total = Math.ceil(counts / size, 10);
		if (err) { deferred.reject(err); }
		else {
			articleModel.find(query).sort({ '_id': -1 }).skip((page - 1) * size).limit(size).populate('author', 'userName').exec(function (err, doc) {
				if (err) { deferred.reject(err); }
				else { deferred.resolve({ docs: doc, counts: total }); }
			});
		}
	});
	return deferred.promise.nodeify(callback);
};
//重写findById
articleDao.prototype.findById = function (id, callback) {
	var deferred = Q.defer();
	articleModel.findById(id)
		.populate('author', 'userName')//populate查询多个字段 mongoose 3.6之上
		.populate('comments', 'author msg createDate')
		.exec(function (err, doc) {
			if (err) { deferred.reject(err); }
			else { deferred.resolve(doc); }
		});
	return deferred.promise.nodeify(callback);
};
module.exports = new articleDao();
