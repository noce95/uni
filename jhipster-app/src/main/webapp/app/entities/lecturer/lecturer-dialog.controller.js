(function() {
    'use strict';

    angular
        .module('universityApp')
        .controller('LecturerDialogController', LecturerDialogController);

    LecturerDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Lecturer'];

    function LecturerDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Lecturer) {
        var vm = this;

        vm.lecturer = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.lecturer.id !== null) {
                Lecturer.update(vm.lecturer, onSaveSuccess, onSaveError);
            } else {
                Lecturer.save(vm.lecturer, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('universityApp:lecturerUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
