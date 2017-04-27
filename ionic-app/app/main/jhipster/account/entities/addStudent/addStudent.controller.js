(function() {
    'use strict';

    angular
        .module('main')
        .controller('addStudentController', addStudentController);
        
    addStudentController.$inject = ['$state', 'entity', 'addStudentService','$window'];
    function addStudentController ($state, entity, addStudentService, $window) {
        var vm = this;
        vm.student = entity;
        vm.save = save;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        
        vm.ricalcola = ricalcola;
        
        vm.showForm=true;
        vm.showMsg=false;
        
        function save () {
            vm.isSaving = true;
            if (vm.student.id !== null) {
                addStudentService.update(vm.student, onSaveSuccess, onSaveError);
            } else {
                addStudentService.save(vm.student, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {/*
            $scope.$emit('universityApp:studentUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;*/
            console.log("studente inserito correttamente");
            vm.showForm=false;
            vm.showMsg=true;
        }

        function onSaveError () {
            //vm.isSaving = false;
            console.log("ancora cazzi");
        }
        vm.datePickerOpenStatus.dateOfBirth = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
        
        function ricalcola(){
            console.log("sono in ricalcola");
            $window.location.reload();
            $state.go('home');
        }
    }
})();

