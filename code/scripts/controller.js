
var assignLst = angular.module('assignLst', []);

assignLst.controller('AssignLstCtrl', ['$scope','$http', function ($scope, $http) {
  $http.get('http://whatsdueapp.com/users/dan/assignments/POL%20234.json').success(function(data) {
    $scope.events = data;
	console.log(data);	

  });
 
  $scope.orderProp = 'time';
}]);

