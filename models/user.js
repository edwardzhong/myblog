var mongoose=require('./mongodb');
var schema=mongoose.Schema;
var crypto=require('crypto');

var userSchema=new schema({
	userName:{type : String, default : '', trim : true},
    hash_password:{type : String, default : ''},
    salt: { type: String, default: '' },
    gender:{type : String, default : ''},
    email:{type : String, default : ''},
    phone:{type : String, default : ''},
    temp:{type : String, default : 'default'},
    nickName:{type : String, default : '', trim : true},
    myWord:{type : String, default : '', trim : true},
    blogName:{type : String, default : '', trim : true}
});

userSchema.path('userName').required(true, '用户名不能为空');

userSchema.virtual('password')
	.set(function(password) {
		this.salt = this.makeSalt();
		this.hash_password = this.encryptPass(password);
	})
	.get(function() { return this.hash_password; });

/**
 * Methods
 */
userSchema.methods={
	encryptPass:function (pass){
		return crypto.createHash('md5').update(pass+this.salt).digest('hex');
	},
	makeSalt:function () {
		return Math.round((new Date().valueOf() * Math.random())) + '';
	},
	authenticate:function(plainText){
		return this.encryptPass(plainText) === this.hash_password;
	}
};
module.exports=mongoose.model("user", userSchema);

