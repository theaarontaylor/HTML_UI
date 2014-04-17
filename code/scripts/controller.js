
var assignLst = angular.module('assignLst', []);
assignLst.controller('AssignLstCtrl', ['$scope','$http', function ($scope, $http) {
  $http.get('http://u.cs.biu.ac.il/~altshus/demo.json').success(function(data) {
    $scope.events = data.events;
	console.log(data);	
  });
 
  $scope.orderProp = 'time';
}]);