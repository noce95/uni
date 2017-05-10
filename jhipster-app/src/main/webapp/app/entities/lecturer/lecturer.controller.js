(function() {
    'use strict';

    angular
        .module('universityApp')
        .controller('LecturerController', LecturerController);

    LecturerController.$inject = ['Lecturer'];

    function LecturerController(Lecturer) {

        var vm = this;

        vm.lecturers = [];

        loadAll();

        function loadAll() {
            Lecturer.query(function(result) {
                vm.lecturers = result;
                vm.searchQuery = null;
            });
        }
    }
})();
