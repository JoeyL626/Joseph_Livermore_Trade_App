angular.module('myapp')
.controller('DetailCtrl', ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
	console.info('DetailCtrl'); 
	$http.get('/js/data.json').success(function(data) {
		$scope.artist = data;
		$scope.currentArtist = $scope.artist[$routeParams.artistId];
		//console.log('my data', $scope.artist, $scope.currentArtist);

		if ($routeParams.artistId > 0) {
			$scope.prevArtist = Number($routeParams.artistId)-1;
			console.log("Previous Index: ", $scope.prevArtist);
		} else {
			$scope.prevArtist = $scope.artist.length-1;
			console.log("Previous Index: ", $scope.prevArtist);
		}

		if ($routeParams.artistId < $scope.artist.length-1) {
			$scope.nextArtist = Number($routeParams.artistId)+1;
			console.log("Next Index: ", $scope.prevArtist);
		} else {
			$scope.nextArtist = 0;
			console.log("Next Index: ", $scope.prevArtist);
		}
	});

}]);