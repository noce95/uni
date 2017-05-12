(function() {
    'use strict';

    angular
        .module('main')
        .controller('addStudentController',addStudentController);
    
    addStudentController.$inject=['$timeout','$window','$state', 'Principal', '$scope', 'entity','addStudentService'];

function addStudentController($timeout, $window, $state, Principal, $scope, entity, addStudentService){
    var vm=this;
    
    vm.student = entity;
    vm.salvato = true;
    vm.avviso=false;
    vm.datePickerOpenStatus = {};
    vm.openCalendar = openCalendar;
    vm.save = save;
    getAccount();
    
    
    function getAccount() {
        Principal.identity().then(function(account) {
            vm.student.user = account;
        });
    }
        
    function save () {
            vm.isSaving = true;
            if (vm.student.id !== null) {
                addStudentService.update(vm.student, onSaveSuccess, onSaveError);
            } else {
                addStudentService.save(vm.student, onSaveSuccess, onSaveError);
            }
    }
        
    function onSaveSuccess (result) {
       /* $scope.$emit('universityApp:studentUpdate', result);
        $uibModalInstance.close(result);
        vm.isSaving = false;*/
        vm.salvato = false;
        vm.avviso = true;
        console.log("Studente SALVATO!");
        $timeout(function () {
            $window.location.reload();
            vm.avviso = false;
            $state.go('home');
            $window.location.reload();
        }, 1500);

    }

    function onSaveError () {
        /*vm.isSaving = false;*/
        console.log("ancora cazzi!");
    }
    vm.datePickerOpenStatus.dateOfBirth = false;
    function openCalendar (date) {
        vm.datePickerOpenStatus[date] = true;
    }
}

})();
