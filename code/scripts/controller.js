
var assignLst = angular.module('assignLst', []);

assignLst.controller('AssignLstCtrl', ['$scope','$http',  function ($scope, $http) {
	
  $.getJSON('http://admin.whatsdueapp.com/all/assignments.json').success(function(data) {
	newdata = Array();
	for(i=0; i<data.length; i++)
		if(existsCourse(data[i].course_i_d))
			newdata = newdata.concat(Array(data[i]));
    $scope.events = newdata;
	$scope.$apply();
	console.log(newdata);	
	$('.deploy-toggle-1').click(function(){
		$(this).parent().find('.toggle-content').toggle(100);
		$(this).toggleClass('toggle-1-active');
		return false;
	});
	
	$('.delete-button').click(function(){
		$(this).parent().hide(1000);
		return false;
	});
	
	$(".fancy-date").html(function(index, value) {
		var mm = moment(value, "YYYY-MM-DD HH:mm");
		return mm.fromNow() + ", " + mm.calendar();
	});

  });
 
  $scope.orderProp = 'due_date';
}]);

var searchAssign = angular.module('searchAssign',[]);

searchAssign.controller('searchController', ['$scope','$http',function ($scope, $http) {
  $.getJSON('http://admin.whatsdueapp.com/all/courses.json').success(function(data) {
		
		$scope.courses = data;
		$scope.$apply();
		console.log(data);	
		$('.checkbox-one').click(function(){
			$(this).toggleClass('checkbox-one-checked');
			return false;
		}).addClass('checkbox-ok');
		
		$('.choose-course').click(function(){
			var courseID = $(this).parent().children("span").html();
			if($(this).hasClass("checkbox-one-checked"))
				addCourse(courseID);
			else
				removeCourse(courseID);
			return false;
		});
		
		$('.choose-course').addClass(function(index, currentClass){
			if(existsCourse($(this).parent().children("span").html()))
				return "checkbox-one-checked";
		});
		
		$("input[name=q]").on('keyup', function(){
			$("a.checkbox").not(".checkbox-ok").click(function(){
				$(this).toggleClass('checkbox-one-checked');
				return false;
			}).addClass('checkbox-ok');
			
			$('.choose-course').addClass(function(index, currentClass){
				if(existsCourse($(this).parent().children("span").html()))
					return "checkbox-one-checked";
		});
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

function dummy(param){
	var i=0;
	console.log(param);
}