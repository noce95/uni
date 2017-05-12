(function() {
    'use strict';

    angular
        .module('main')
        .controller('addExamController', addExamController);

    addExamController.$inject = ['$scope', 'entity', 'addExamService', 'addCourseService', '$window', '$timeout'];

    function addExamController ($scope, entity, addExamService, addCourseService, $window, $timeout) {
        var vm = this;

        vm.exam = entity;
        vm.save = save;
        vm.examavviso = false;
        vm.examsalvato = true;
        vm.courses = addCourseService.query();
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.datePickerOpenStatus.date = false;
         
        function save () {
            vm.isSaving = true;
            if (vm.exam.id !== null) {
                addExamService.update(vm.exam, onSaveSuccess, onSaveError);
            } else {
                addExamService.save(vm.exam, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            vm.examsalvato = false;
            vm.examavviso = true;
            $timeout(function () {
                $window.location.reload();
            }, 1500);
        }

        function onSaveError () {
            vm.isSaving = false;
            console.log("errore");
        }
        
        
        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }

    }
})();

