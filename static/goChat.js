/**
 * Created by onejustone on 2017/2/24.
 */

let myGoChatApp = angular.module('goChat', []);

myGoChatApp.factory('socket', ['$rootScope', function ($rootScope) {
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

myGoChatApp.controller('RoomCtrl', function ($scope, socket) {
	// 房间控制器
	$scope.messages = [];
	socket.emit('getAllMessages');
	// 触发 getAllMessages 事件，该事件有服务器端定义，负者所有
	// client 发送的信息
	socket.on('allMessages', function (data) {
		// 注册 allMessages 事件,用于获得服务器推送的消息
		$scope.messages = data;
	});
	socket.on('messageAdded', function (message) {
		// 监听 messageAdded 事件，该事件有服务器端注册
		// 用于添加后续发送的消息
		$scope.messages.push(message);
	})
});

myGoChatApp.controller('MessageCreatorCtrl', ['$scope', 'socket', function ($scope, socket) {
	// 消息创建控制器 MessageCreatorCtrl，用户创建消息
	$scope.createMessage = function () {
		// 当用户按下 Enter 键时触发该事件
		if ($scope.newMessage == '') {

			return null;
		}
		socket.emit('createMessage', $scope.newMessage);
		// 触发 createMessage 事件，并将新创建的消息推送到服务器端
		$scope.newMessage = '';
		// 清空消息
	}
}]);
//
myGoChatApp.directive('autoScrollToBottom', function () {
	// 自定义指令，当消息过多，出现滚动条时，该组件可以使得滚动条能随着消息的增加自动滑动到底部
	return {
		link: function (scope, element, attrs) {
			scope.$watch(function () {
				return element.children().length;
			}, function () {
				element.animate({
					scrollTop: element.prop('scrollHeight')
				}, 1000);
			})
		},
	}
});

myGoChatApp.directive('ctrlEnterBreakLine', function () {
	// 自定义指令，使用 ctrl+Enter 换行，Enter 发送消息(即调用
	// createMessage 方法)
	return {
		link: function (scope, element, attrs) {
			let ctrlDown = false;
			console.log("fuck")
			element.bind('keydown', function (event) {
				if (event.which === 17) {
					ctrlDown = true;
					setTimeout(function () {
						ctrlDown = false;
					}, 1000);
				}

				if (event.which === 13) {
					if (ctrlDown) {
						element.val(element.val() + '\n');
					} else {
						scope.$apply(function () {
							scope.$eval(attrs.ctrlEnterBreakLine);
						});
						event.preventDefault();
					}
				}
			});
		}
	}

});
