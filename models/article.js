var mongoose=require('./mongodb');
var schema=mongoose.Schema;
var Q=require('q');
var commentModel=require('./comment');

var articleSchema=new schema({
	title:{type : String, default : '', trim : true},
    content:{type : String, default : '', trim : true},
    category:{type : String, default : '', trim : true},
    author:{ type : schema.ObjectId, ref : 'user'},
    createDate: { type : Date, default : Date.now },
    updateDate: { type : Date, default : Date.now },
    tags:{type: [], default:['']},
  //   comments:[{
		// msg:{type : String, default : '', trim : true},
		// createDate:{ type : Date, default : Date.now },
		// author:{ type : schema.ObjectId, ref : 'user'}
  //   }],
    comments:[{type: schema.Types.ObjectId,ref:'comment'}],
	viewCounts:{ type : Number, default : 0 }
});

/**
 * Validations
 */
// articleSchema.path('title').required(true, '标题不能为空');

/**
 * pre-save
 */
articleSchema.pre('save',function(next){
    if(!this.title){next(new Error('标题不能为空'));}
    else{next();}
});

/**
 * Setters getters
 */
articleSchema.path('tags')
.set(function(tags){
	return tags.split(/\,/g);
}).get(function(tags){
    return [].join.call(tags,',');
});
/**
 * methods
 */
articleSchema.methods.Save=function(callback){
    var deferred=Q.defer();
    this.save(function(err,doc){
        if(err){deferred.reject(err);}
        else{deferred.resolve(doc);}
    });
    return deferred.promise.nodeify(callback);
};
module.exports=mongoose.model("article", articleSchema);