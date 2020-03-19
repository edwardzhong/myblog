var articleDao = require('../daos/articleDao'),
  userDao = require('../daos/userDao'),
  Comment = require('../models/comment'),
  commentDao = require('../daos/commentDao'),
  logger = require('../log').logger,
  Q = require('q');

exports.getArticles = function(req, res) {
  var p = JSON.parse(req.query.p || '{}');
  (query = JSON.parse(req.query.q || '{}')), (pageQuery = { page: p.page || 1, size: p.size || 10 });

  return articleDao.getPage(query, pageQuery).then(
    function(data) {
      res.json({ isOk: true, articles: data.docs, total: data.counts });
    },
    function(err) {
      logger.info(err);
      res.json({ isOk: false, articles: null, total: 0 });
    },
  );
};
exports.getArticle = function(req, res) {
  var id = req.params.id;
  return articleDao
    .update({ _id: id }, { $inc: { viewCounts: 1 } })
    .then(function(data) {
      return articleDao.findById(id).then(function(data) {
        res.json({ isOk: true, article: data });
      });
    })
    .fail(function(err) {
      logger.info(err);
      res.json({ isOk: false, article: null });
    });
};
exports.saveArticle = function(req, res) {
  var form = req.body,
    name = req.session.user.userName;
  return userDao()
    .findOne({ userName: name })
    .then(function(user) {
      if (!user) {
        return res.json({ isOk: false });
      }
      if (!form._id) {
        delete form._id;
        form.createDate = form.updateDate = new Date();
        form.author = user._id;
        return articleDao.create(form).then(function(data) {
          res.json({ isOk: true });
        });
      } else {
        var tags = form.tags.split(/\,/g);
        return articleDao
          .update({ _id: form._id }, { title: form.title, content: form.content, tags: tags, updateDate: new Date() })
          .then(function(data) {
            res.json({ isOk: true });
          });
      }
    })
    .fail(function(err) {
      logger.info(err);
      res.json({ isOk: false, err: err.toString() });
    });
};
exports.delArticle = function(req, res) {
  var id = req.params.id,
    userId = req.session.user.id,
    arr = [];
  return articleDao
    .findOne({ author: userId, _id: id })
    .then(function(article) {
      article.comments.forEach(function(id) {
        //删除相关的评论
        arr.push(commentDao.remove({ _id: id }));
      });
      if (arr.length) {
        return Q.all(arr).spread(function() {
          return articleDao.remove({ _id: id }).then(function(data) {
            res.json({ isOk: true, msg: '删除成功' });
          });
        });
      } else {
        return articleDao.remove({ _id: id }).then(function(data) {
          res.json({ isOk: true, msg: '删除成功' });
        });
      }
    })
    .fail(function(err) {
      logger.info(err);
      res.json({ isOk: false, err: err.toString() });
    });
};

exports.addComment = function(req, res) {
  var form = req.body,
    name = req.session.user.userName;
  Q.all([userDao().findOne({ userName: name }), articleDao.findById(form.id)])
    .spread(function(user, article) {
      // return new Comment({"msg":form.msg,"createDate":new Date(),"author":user._id}).Save()
      return commentDao.create({ msg: form.msg, createDate: new Date(), author: user._id }).then(function(com) {
        article.comments.push(com);
        return article.Save().then(function(data) {
          res.json({ isOk: true, msg: '评论成功' });
        });
      });
    })
    // return articleDao.update({"_id":form.id}, {"$push": {"comments":{"msg":form.msg,"createDate":new Date(),"author":user._id}}})
    // .then(function(data){
    // 	res.json({isOk:true,msg:'评论成功'});
    // });
    .fail(function(err) {
      logger.info(err);
      res.json({ isOk: false, err: err.toString() });
    });
};
