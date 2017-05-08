
(function() {
    'use strict';
    angular
        .module('main')
        .controller('studentCourseController', studentCourseController);

    studentCourseController.$inject = ['studentCourseService'];

    function studentCourseController (studentCourseService) {
        
        var vm = this;

        vm.courses = [];

        loadAll();

        function loadAll() {
            studentCourseService.query(function(result) {
                vm.courses = result;
                vm.searchQuery = null;
            });
        }
    }
})();
