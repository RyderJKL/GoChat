/**
 * Created by onejustone on 2017/3/2.
 */

 
let goChat = angular.module('goChat')
.component('login', {
	templateUrl: 'views/login.html',
	controller: 'LoginCtrl'
});


goChat.controller('LoginCtrl', ['$scope', '$http', '$location', function (
	$scope, $http, $location
) {
	$scope.login = function () {
		console.log("发起登录请求。。。"+ $scope.email)

		$http({
			url:'/api/login',
			method: 'POST',
			data: {
				email: $scope.email
			}
		}).then(( (user) => {
			console.log("登录成功")
			$scope.$emit('login', user);
			// 触发 login 事件，并将 user 作为数据返回
			// login 事件在 run 模块中被注册
			// $urlRouterProvider.redirectTo('/')
			//	不能在这里使用 $urlRouterProvider 服务
			$location.path('/')
		})).catch((
			// (err) => $urlRouterProvider.redirectTo('/login')
			//	不能在这里使用 $urlRouterProvider 服务
			(err) => {
				console.log("登录失败")
				$location.path('/login')
			}
		))
	}
}])