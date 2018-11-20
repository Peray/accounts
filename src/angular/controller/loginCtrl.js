commonApp
.constant('authUrl', 'http://localhost:5600/users/login')
.controller('loginCtrl', ['$rootScope', '$scope', '$http', '$location', 'authUrl', function($rootScope, $scope, $http, $location, authUrl){

	$scope.authenticate = function (user, pass) {
		$http.post(authUrl, {
			username: user,
			password: pass
		}, {
			withCredentials: true
		}).then(function (data) {
			if(data.status == 200 || data.statusText == 'OK'){
				sessionStorage.setItem('user',JSON.stringify(data.config.data));
				$location.path('/main');
			}else{
				$location.path('/login');
				$scope.authenticationError = true;
			}
			
		}, function (error) {
			$scope.authenticationError = true;
		})
	};
}]);