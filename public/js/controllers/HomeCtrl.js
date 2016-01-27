angular.module('myapp')
.controller('HomeCtrl', ["$scope", "$http", "$firebaseArray", "$firebaseAuth", "$location", function ($scope, $http, $firebaseArray, $firebaseAuth, $location) {

	var authURL = "stufftraderapp.firebaseIO.com";
	var URL = "stufftraderapp.firebaseIO.com/";
	$scope.authObj = $firebaseAuth(new Firebase(authURL));
				
	$scope.submitRegister = function(){
			
		$scope.authObj.$createUser({

		  email: $scope.user.email,
		  password: $scope.user.password
		
		}).then(function(userData) {
		  console.log("User " + userData.uid + " created successfully!");
		
		  return $scope.authObj.$authWithPassword({
		    email: $scope.user.email,
		  	password: $scope.user.password
		  });

		}).then(function(authData) {
		 	
		 	
			var list = $firebaseArray(new Firebase(URL +"users/"+ authData.auth.uid));
			$scope.users = list;
		  
		  list.$add($scope.user).then(function(ref){
				var id = ref.key();
				console.log("added record with id " + id);
				list.$indexFor(id);
			});

			$location.path("/posts");
		
		}).catch(function(error) {
		  
		  console.error("Error: ", error);
		
		});
			
	}

		
	$scope.submitLogin = function(){
			
		$scope.authObj.$authWithPassword($scope.login).then(function(authData) {
		
		  $location.path("/posts");

		}).catch(function(error) {
		  console.error("Authentication failed:", error);

		});
			
	}

	$scope.authObj.$onAuth(function(authData) {
  
  if (authData) {
    console.log("Logged in as:", authData.uid);
  

	$scope.removeUser = function (index) {
          console.log("index", index);
     list.$remove(list[index]).then(function(ref){
       ref.key() === list.$id; // true
     });
  }

  $scope.editUser = function (index) {
     console.log("index", index);
     list.$save(list[index]).then(function(ref) {
       ref.key() === list[2].$id; // true
     });

  }

	var post = $firebaseArray(new Firebase(URL +"posts/"+ authData.uid));
	$scope.posts = post;

	$scope.postAdd = function () {

     post.$add($scope.item).then(function(ref) {
       var id = ref.key();
       console.log("added item with id " + id);
       post.$indexFor(id); // returns location in the array
     });
     $location.path("/posts");
  }
   
  $scope.removeTrade = function (index) {
     console.log("index", index);
     post.$remove(index)
  }

  $scope.editTrade = function (index) {
     console.log("index", index);
     post.$save(index)

  }

  var wtb = $firebaseArray(new Firebase(URL +"wtb/"+ authData.auth.uid));
	$scope.wtbs = wtb;

  $scope.WtbAdd = function () {
     
     console.log("form data", $scope.todo);

     wtb.$add($scope.wtb).then(function(ref) {
       var id = ref.key();
       console.log("added wtb with id " + id);
       wtb.$indexFor(id); // returns location in the array
     });
  }
   
  $scope.removeWtb = function (index) {
     console.log("index", index);
     wtb.$remove(index)
  }

  $scope.editWtb = function (index) {
     console.log("index", index);
     wtb.$save(index)

  }

} else {
    console.log("Logged out");
  }
});
	
	}]);
