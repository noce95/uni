(function() {
    'use strict';

    angular
        .module('universityApp')
        .controller('ExamController', ExamController);

    ExamController.$inject = ['Exam'];

    function ExamController(Exam) {

        var vm = this;

        vm.exams = [];

        loadAll();

        function loadAll() {
            Exam.query(function(result) {
                vm.exams = result;
                vm.searchQuery = null;
            });
        }
    }
})();
