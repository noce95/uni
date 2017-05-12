
(function() {
    'use strict';
    angular
        .module('main')
        .controller('courseExamController', courseExamController);

    courseExamController.$inject = ['courseExamService'];

    function courseExamController (courseExamService) {
        
        var vm = this;

        vm.exams = [];

        loadAll();

        function loadAll() {
            courseExamService.query(function(result) {
                vm.exams = result;
                vm.searchQuery = null;
            });
        }
    }
})();
