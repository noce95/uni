
(function() {
    'use strict';
    angular
        .module('main')
        .controller('studentCourseController', studentCourseController);

    studentCourseController.$inject = ['studentCourseService', '$scope', '$state', '$rootScope'];

    function studentCourseController (studentCourseService, $scope, $state, $rootScope) {
        
        var vm = this;
        
        vm.courses = [];

        loadAll();
        
        function loadAll() {
            studentCourseService.query(function(result) {
                vm.courses = result;
                vm.searchQuery = null;
            });
        }
        
        $scope.passaId = function (courseId){
            console.log("controller studentCourse");
            console.log(courseId);
            $state.go("courseExam", {courseId: courseId});
            $rootScope.corso = courseId;
        };
        
        
    }
})();
