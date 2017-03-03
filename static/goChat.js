/**
 * Created by onejustone on 2017/3/2.
 */


angular.module('goChat',['ui.router'])
.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.otherwise(
		'/room'
	);

	let states = [
		// {
		// 	name: 'login',
		// 	url: '/login',
		// 	component: 'login',
		// 	// controller: 'LoginCtrl'
		// },

		{
			name: 'room',
			url:'/room',
			component:'room',
			// controller: 'RoomCtrl'
		}
	];

	states.forEach(function (state) {
		$stateProvider.state(state);
	})
}]);