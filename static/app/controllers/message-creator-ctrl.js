/**
 * Created by onejustone on 2017/3/2.
 */



angular.module('goChat')
.controller('MessageCreatorCtrl', ['$scope', 'socket', function ($scope, socket) {
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