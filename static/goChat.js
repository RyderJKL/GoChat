/**
 * Created by onejustone on 2017/3/2.
 */


angular.module('goChat',['ui.router'])
.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.otherwise(
		'/room'
	);

	let states = [
		{
			name: 'login',
			url: '/login',
			component: 'login',
		},

		{
			name: 'room',
			url:'/room',
			component:'room',
		}
	];

	states.forEach(function (state) {
		$stateProvider.state(state);
	})
}]).run(['$window', '$rootScope', '$http','$urlRouterProvider',function($window, $rootScope, $http, $urlRouterProvider) {
	$http.get('/api/validate').then(( (user) => {$rootScope.me = user; $urlRouterProvider.redirectTo('/')}),( (err) => {$urlRouterProvider.redirectTo('/login')}));
}]);