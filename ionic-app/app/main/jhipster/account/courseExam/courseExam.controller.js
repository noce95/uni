
(function() {
    'use strict';
    angular
        .module('main')
        .controller('courseExamController', courseExamController);

    courseExamController.$inject = ['courseExamService', '$rootScope'];

    function courseExamController (courseExamService, $rootScope) {
       
        var vm = this;
        var courseId = $rootScope.corso;
        
        vm.exams = [];
        
        loadAll();  
        
        function loadAll() {
            courseExamService.query( {courseId : courseId} , function(result) {
                vm.exams = result;
                vm.searchQuery = null;
                console.log("exams");
                console.log(result);
            });
        }
        
        /*
        function prenota(){
            console.log("hai prenotato");
        }*/
    }
})();
