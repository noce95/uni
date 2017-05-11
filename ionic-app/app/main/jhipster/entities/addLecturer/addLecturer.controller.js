(function() {
    'use strict';

    angular
        .module('main')
        .controller('addLecturerController', addLecturerController);

    addLecturerController.$inject = ['$scope', 'entity', 'addLecturerService', 'User', '$window', '$timeout'];

    function addLecturerController ($scope, entity, addLecturerService, User, $window, $timeout) {
        var vm = this;

        vm.lecturer = entity;
        vm.save = save;
        vm.lectureravviso = false;
        vm.lecturersalvato = true;
        //vm.courses = Course.query();
        vm.users = User.query();
         
        function save () {
            vm.isSaving = true;
            if (vm.lecturer.id !== null) {
                addLecturerService.update(vm.lecturer, onSaveSuccess, onSaveError);
            } else {
                addLecturerService.save(vm.lecturer, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            vm.lecturersalvato = false;
            vm.lectureravviso = true;
            $timeout(function () {
                $window.location.reload();
            }, 1500);
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

