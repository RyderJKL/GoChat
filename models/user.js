/**
 * Created by onejustone on 2017/3/3.
 */

 
let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let User = new Schema({
	email: String,
	name: String,
	avatarUrl: String
//	根据用户的邮箱地址来获得 avatar 头像
});

module.exports = User;