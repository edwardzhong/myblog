var mongoose = require('./mongodb');
var schema = mongoose.Schema;
var Q = require('q');

var commentSchema = new schema({
  msg: { type: String, default: '', trim: true },
  createDate: { type: Date, default: Date.now },
  author: { type: schema.ObjectId, ref: 'user' },
});

/**
 * pre-save
 */
commentSchema.pre('save', function(next) {
  if (!this.msg) {
    next(new Error('内容不能为空'));
  } else {
    next();
  }
});

/**
 * methods
 */
commentSchema.methods.Save = function(callback) {
  var deferred = Q.defer();
  this.save(function(err, doc) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(doc);
    }
  });
  return deferred.promise.nodeify(callback);
};

module.exports = mongoose.model('comment', commentSchema);
