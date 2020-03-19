var Q = require('q');

function BaseDao(Model, entity) {
  this.model = Model;
  this.entity = entity;
}
/*	获取分页信息
 *	query:查询条件;
 *	pageQuery:分页条件,格式:{page:1,size:10}
 *	返回结果: {docs:[],counts:Number}
 */
BaseDao.prototype.getPage = function(query, pageQuery, callback) {
  //blogModel.find(query,null,{sort: [['_id', -1]]},callback);
  var deferred = Q.defer(),
    page = pageQuery.page,
    size = pageQuery.size,
    total = 0,
    model = this.model;
  model.count(query, function(err, counts) {
    total = Math.ceil(counts / size, 10);
    if (err) {
      deferred.reject(err);
    } else {
      model
        .find(query)
        .sort({ _id: -1 })
        .skip((page - 1) * size)
        .limit(size)
        .exec(function(err, doc) {
          if (err) {
            deferred.reject(err);
          } else {
            deferred.resolve({ docs: doc, counts: total });
          }
        });
    }
  });
  return deferred.promise.nodeify(callback);
};
BaseDao.prototype.find = function(query, callback) {
  var deferred = Q.defer();
  this.model.find(query, function(err, docs) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(docs);
    }
  });
  return deferred.promise.nodeify(callback);
};
BaseDao.prototype.findById = function(id, callback) {
  var deferred = Q.defer();
  this.model.findById(id, function(err, doc) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(doc);
    }
  });
  return deferred.promise.nodeify(callback);
};
BaseDao.prototype.findOne = function(query, callback) {
  var deferred = Q.defer();
  this.model.findOne(query, function(err, doc) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(doc);
    }
  });
  return deferred.promise.nodeify(callback);
};
BaseDao.prototype.distinct = function(field, query, callback) {
  var deferred = Q.defer();
  this.model.distinct(field, query, function(err, doc) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(doc);
    }
  });
  return deferred.promise.nodeify(callback);
};
BaseDao.prototype.count = function(query, callback) {
  var deferred = Q.defer();
  this.model.count(query, function(err, counts) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(counts);
    }
  });
  return deferred.promise.nodeify(callback);
};
BaseDao.prototype.remove = function(query, callback) {
  var deferred = Q.defer();
  this.model.remove(query, function(err) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(true);
    }
  });
  return deferred.promise.nodeify(callback);
};
BaseDao.prototype.create = function(object, callback) {
  var deferred = Q.defer();
  this.model.create(object, function(err, doc) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(doc);
    }
  });
  return deferred.promise.nodeify(callback);
};
/*使用实体进行保存
 */
BaseDao.prototype.save = function(callback) {
  var deferred = Q.defer();
  new this.model(this.entity).save(function(err) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(true);
    }
  });
  return deferred.promise.nodeify(callback);
};
BaseDao.prototype.update = function(query, condition, callback) {
  var deferred = Q.defer();
  this.model.update(query, condition, { safe: false }, function(err) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(true);
    }
  });
  return deferred.promise.nodeify(callback);
};
module.exports = BaseDao;
