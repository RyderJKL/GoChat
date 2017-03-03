/**
 * Created by onejustone on 2017/3/2.
 */


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