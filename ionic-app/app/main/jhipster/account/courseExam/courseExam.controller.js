
(function() {
    'use strict';
    angular
        .module('main')
        .controller('courseExamController', courseExamController);

    courseExamController.$inject = ['$http','courseExamService','studentCourseService','$stateParams'];

    function courseExamController ($http, courseExamService, studentCourseService, $stateParams) {
        
        var vm = this;
        //vm.prenota = prenota();
        
        vm.exams = [];
        vm.mycourses = [];
        vm.myexams = [];
        
        var indice = $stateParams.id;
        
        var myUrl ="api/exams/"+indice;
        $http.get(myUrl).success(function(data){
            vm.exams = data;
        });
        
        //loadAll();  
        
        /*
        console.log($stateParams.prova1);
        console.log($stateParams.prova2);
        *//*
        function loadAll() {
            courseExamService.query(function(result) {
                vm.exams = result;
                vm.searchQuery = null;
                console.log("exams");
                console.log(result);
            });
            studentCourseService.query(function(result) {
                console.log("courses");
                console.log(result);
                vm.mycourses = result;
                vm.searchQuery = null;
            });
        }
        */
        
        
        
        /*
        function prenota(){
            console.log("hai prenotato");
        }*/
    }
})();
