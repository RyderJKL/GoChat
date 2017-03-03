/**
 * Created by onejustone on 2017/3/3.
 */

 
let db = require('../models')
let async = require('async')
let gravatar = require('gravatar')

exports.findUserById = function (_userId, callback) {
	// 通过 id 查找用户
	db.User.findOne({
		_id: _userId
	}, callback)
};

exports.findByEmailOrCreate = function (email,callback) {
	// 通过邮箱查找用户
	// 如果用户不存在，则创建一个新用户
	db.User.findOne({
		email:email
	}, function (err, user) {
		if (user){
			callback(null, user)
		} else {
			user = new db.User;
			user.name = email.split('@')[0];
			user.email = email;
			user.avatarUrl = gravatar.url(email);
			user.save(callback);
		}
	})
}