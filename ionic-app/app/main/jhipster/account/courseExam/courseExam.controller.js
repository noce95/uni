
(function() {
    'use strict';
    angular
        .module('main')
        .controller('courseExamController', courseExamController);

    courseExamController.$inject = ['$http','courseExamService','studentCourseService','$stateParams'];

    function courseExamController ($http, courseExamService, studentCourseService, $stateParams) {
        
        var vm = this;
        
        vm.exams = [];
        vm.mycourses = [];
        
        
        var indi = $stateParams.id;
        
        loadAll();  
        
        function loadAll() {
            courseExamService.query(function(result) {
                vm.exams = result;
                vm.searchQuery = null;
                console.log("exams");
                console.log(result);
            });
            studentCourseService.query(function(result) {
                vm.mycourses = result;
                vm.searchQuery = null;
                console.log("course");
                console.log(result);
            });
        }
        
        /*
        function prenota(){
            console.log("hai prenotato");
        }*/
    }
})();
