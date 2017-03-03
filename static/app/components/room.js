

angular.module('goChat')
.controller('RoomCtrl', function ($scope, socket) {
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


angular.module('goChat')
.component('room',{
	templateUrl: 'views/room.html',
	controller: 'RoomCtrl'
	// controllerAs: ['RoomCtrl','MessageCreatorCtrl']
})


