### GoChat

GoChat 基于 socket.io 和 Angular.js 的多人多房间聊天室，做这个项目的目的主要在于将 Node.js 与 前端开发框架结合起来体会前端开发的流程以及如何去实现一个真正的单页面(SPA)应用。


---
### 技术栈

* Angular.js v1.6.1
* Angular-UI-Router v1.0.0.3
* socket.io v.1.7.3
* Express v4.14.1
* Mongoose v4.8.5
* Node.js v7.4.0
* Async v2.1.5
* Bootstrap v3.3.6
* JQuery v1.11.1
* Require.js
* Gulp.js


---
### 基础架构

#### socket.io
WebSocket 是 HTML5 中加入的新特性，它为浏览器和服务器端提供了一个基于 TCP 链接的双向通道。使用 WebSocket 我们可以构建一个真实的实时 Web 应用。但并不是所有的浏览器都支持 WebSocket 应用，考虑到兼容性的问题，我们可以使用其它的方法来实现实时通信。比如:轮询，长轮询，基于流或者 Flash Socket 的实现。

`socket.io` 就是为了弥补浏览器间的差异，为开发者提供了一个接口，在不支持 WebSocket 的浏览器中，`socket.io` 可以降级为其它的通信方式来实现实时通信。下面是  `socket.io` 的通信方式列表:

* WebSocket
* Adobe Flash Socket
* AJAX long polling
* AJAX multipart streaming
* Forever iFrame
* JSONP Polling


###### 使用 socket.io
socket.io 使用 `on/emit` 即是订阅/发布模式来实现服务器和客户端的通信。所以，在 JavaScript 环境中构建 socket.io 应用程序，需要客户端和服务器端的相互合作。

```  
npm install --save socket.io
```

* 客户端使用 socket.io

``` 
...
<head>
<script src="/socket.io/socket.io.js"></script>
</head>
...

<script type="text/javascript">
let socket = io.connect('/');
// io 是一个全局对象
socket.on('news', function(data){
// 监听(订阅) news 事件,用来接收服务器端发送的 news 内容
    console.log(data);
    socket.emit('my other event', { message: 'hello, world'});
    
    // socket.emit 是发送信息给服务器端的方法
    // 并同时发布(触发) `my other event` 事件，该事件由服务器端注册
   
})
</script>
```

如上，客户端脚本 `/socket.io/socket.io.js` 由 `socket.io` 的服务器端自动映射匹配，并不需要将其添加到网站的静态目录中(仅限于开发环境中)。

下面是 `socket.io` 的服务器端实现。

###### 使用 Express 和 socket.io 搭建 WebSocket 服务器端
 
 ``` 
 let app = require('express').createServer();
 let io = require('socket.io').listen(app);
 app.listen(7880, function(){
    console.log('yes,Web Server start!');
 });
 
 app.get('/', function(req, res){
    res.sendfile(__dirname, '/static/index.html')
 })
 
 io.on('connection', function(socket){
    // 监听 connection 事件
    socket.emit('news', { hello: 'Jack'});
    // 发送消息到 客户端
    socket.on('my other event', function(data){
    // 注册 `my other event` 事件
        console.log(data);
    })
     socket.broadcast.emit('user connected`)
    // 广播信息给除当前用户之外的用户
    io.emit('all users');
    // 广播信息给所有客户端
 })
 ```

#### Angular.js

Angular.js 是一个前端的 MVC 框架，它实现了视图和数据从的双向绑定。让开发人员可以专注于功能开发，而无需纠缠于繁琐的 DOM 操作中。但考虑到 AngularJS `ngRoute` 的局限性，我们将使用 `ui.router`。


---
### 具体实现

---
#### 0x00 封装 socket.io 
上面的例子中，我们给出来简单的使用 `socke.io` 的 demo，我们需要将其封装为 AngularJS 的一个服务对象 `sokcet`，以方便使用，下面是具体的封装过程:

``` 
angular.module('goChat')
.factory('socket', ['$rootScope', function ($rootScope) {
	// 将 socket.io 封装为一个名为 socket 的服务，这样就可以在
	// AngularJS 中的其它组件中使用 socket 与服务器端通信了
	let socket = io('/');

	return {
		on: function (eventName, callback) {
			socket.on(eventName, function () {
				let args = arguments;
				$rootScope.$apply(function () {
					// 告诉 AngularJS 执行 callback
					// 以后检查
					//$rootScope
					// 即是整个应用程序的状态，如果有变化就更新
					// messages 数据状态，让后更新视图。
					callback.apply(socket, args);
				})
			})
		},

		emit: function (eventName, data, callback) {
			socket.emit(eventName, data, function () {
				let args = arguments;
				$rootScope.$apply(function () {
					if (callback) {
						callback.apply(socket, args);
					}
				})
			})
		}
	}
}]);
```

---
#### 0x01 用户登录认证
AngularJS 提供了 `Run Block` 启动模块，当整个应用启动时将首先运行这个块，我们将登录验证逻辑写在这里:

``` 

```