
(function() {
    'use strict';
    angular
        .module('main')
        .controller('studentCourseController', studentCourseController);

    studentCourseController.$inject = ['studentCourseService', 'addStudentService', '$scope', '$state', '$rootScope'];

    function studentCourseController (studentCourseService, addStudentService, $scope, $state, $rootScope) {
        
        var vm = this;
        var idStudent;
        
        vm.courses = [];

        loadAll();
        
        function loadAll() {
            studentCourseService.query(function(result) {
                vm.courses = result;
                vm.searchQuery = null;
            });
            addStudentService.query(function(result) {
                idStudent = result[0].id;
                vm.searchQuery = null;
                $rootScope.studentId = idStudent;
            });
        }
        
        $scope.passaId = function (courseId){
            $state.go("courseExam", {courseId: courseId});
            $rootScope.corso = courseId;
        };
        
        
        
    }
})();
