/**
 * Created by onejustone on 2017/2/24.
 */

let  express = require('express');
let app = express();
let server = require('http').createServer(app);
let path = require('path')
// 添加 express 服务


let io = require('socket.io')(server);


let messages = [];
io.on('connection', function (client) {
	// socket.io 提供的接口是基于事件的
	// 服务器端监听 connection 事件，如果有客户端连接的话，就会产生一个
	// socket 对象，使用这个对象就可以和对应的客户端实时通信了

	console.log("yes,come body coming!")


	client.on('disconnect', function () {
		console.log('no, somebody come away...')
	})
	client.on('getAllMessages', function () {
		// 监听客户端的 getAllMessages 请求，并将
		// messages 数组中的信息发送给客户端
		client.emit('allMessages', messages);
	});

	client.on('createMessage', function (message) {
		// 当用户创建信息时，向服务器端发送 createMessage
		// 事件，服务器将信息放入 messages 数组中，并通过
		// io.emit 事件向所有客户端广播
		// messageAdded：有新的消息添加进来。

		messages.push(message);
		io.emit('messageAdded',messages);
	})
});

app.use(express.static(path.join(__dirname, 'static')));
// 设置静态目录

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/',function (req, res) {
	// 将所有请求转发到 index.html 中去
	// 服务器不关心路由，路由全部由 Angular.js 去处理
	res.sendFile(__dirname + '/static/views/index.html');
});

app.use(function(err, req, res, next) {
	// error handler
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});



server.listen(7880, function(){
	console.log('Web Server Start');
});
