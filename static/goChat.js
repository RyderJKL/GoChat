/**
 * Created by onejustone on 2017/3/2.
 */

// run 启动模负者进行用户验证，并提供 logout 方法实现用户退出

// config 进行应用的状态管理
angular.module('goChat',['ui.router'])
.run(['$window', '$rootScope', '$http','$location',function($window, $rootScope, $http, $location) {
	$http({
		url:'/api/validate',
		method:'GET'
	}).then(
		( (user) => {
			console.log('启动模块')
			$rootScope.me = user;
			console.log('yes');
			$location.path('/');
			// $urlRouterProvider.redirectTo('/')
		//	不能在这里使用 $urlRouterProvider 服务
		})
	).catch(
		// ( (err) => $urlRouterProvider.redirectTo('/login'))
		//	不能在这里使用 $urlRouterProvider 服务
		((err) => { $location.path('/login');})
	);

	$rootScope.logout = function () {
		$http({
			url: '/api/logout',
			method: 'GET'
		}).then(((data) => {$rootScope.me = null;$location.path('/login')}))
	};

	$rootScope.$on('login', function (event, me) {
		// 注册登录事件，该事件在 LoginCtrl
		// 控制器中触发，以次获得用户的登录信息
		$rootScope.me = me;
	})
}]).config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.otherwise(
		'/login'
	);

	let states = [
		{
			name: 'login',
			url: '/login',
			component: 'login',
		},

		{
			name: 'room',
			url: '/room',
			component: 'room',
		}
	];

	states.forEach(function (state) {
		$stateProvider.state(state);
	})
}]);


