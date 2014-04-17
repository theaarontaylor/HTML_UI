
var assignLst = angular.module('assignLst', []);

assignLst.controller('AssignLstCtrl', ['$scope','$http',  function ($scope, $http) {
	
  $.getJSON('http://admin.whatsdueapp.com/users/dan/assignments/POL%20234.json').success(function(data) {

    $scope.events = data;
	$scope.$apply();
	//console.log(data);	
	$('.deploy-toggle-1').click(function(){
		$(this).parent().find('.toggle-content').toggle(100);
		$(this).toggleClass('toggle-1-active');
		return false;
	});
	
	$(".fancy-date").html(function(index, value) {
		return moment(value, "YYYY-MM-DD").fromNow();
	});

  });
 
  $scope.orderProp = 'due_date';
}]);

var searchAssign = angular.module('searchAssign',[]);

searchAssign.controller('searchController', ['$scope','$http',function ($scope, $http) {
  $.getJSON('http://admin.whatsdueapp.com/all/courses.json').success(function(data) {
		$scope.courses = data;
		$scope.$apply();
		//console.log(data);	
		$('.checkbox-one').click(function(){
			$(this).toggleClass('checkbox-one-checked');
			return false;
		});
		
		$('.choose-course').click(function(){
			var courseID = $(this).parent().parent().children("span").html();
			if($(this).hasClass("checkbox-one-checked"))
				addCourse(courseID);
			else
				removeCourse(courseID);
			return false;
		});
		
		$('.choose-course').addClass(function(index, currentClass){
			if(existsCourse($(this).parent().parent().children("span").html()))
				return "checkbox-one-checked";
		});
	});
 
  $scope.orderProp = 'due_date';
}]);

function addCourse(course){
	if(null == localStorage.getItem('courses'))
		localStorage.setItem('courses', JSON.stringify(Array(course)));
	else{
		courses = JSON.parse(localStorage.getItem('courses'));
		if(courses.indexOf(course) != -1)
			return;
		courses = courses.concat(Array(course));
		localStorage.setItem('courses', JSON.stringify(courses));
	}
}

function removeCourse(course){
	if(null == localStorage.getItem('courses'))
		return;
	else{
		courses = JSON.parse(localStorage.getItem('courses'));
		var i = courses.indexOf(course);
		if(i == -1)
			return;
		courses.splice(i,1);
		localStorage.setItem('courses', JSON.stringify(courses));
	}
}

function existsCourse(course){
	if(null == localStorage.getItem('courses'))
		return false;
	courses = JSON.parse(localStorage.getItem('courses'));
	return courses.indexOf(course) != -1;
}
