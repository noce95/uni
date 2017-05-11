(function() {
    'use strict';

    angular
        .module('universityApp')
        .controller('ExamDialogController', ExamDialogController);

    ExamDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Exam', 'Course'];

    function ExamDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Exam, Course) {
        var vm = this;

        vm.exam = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.courses = Course.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.exam.id !== null) {
                Exam.update(vm.exam, onSaveSuccess, onSaveError);
            } else {
                Exam.save(vm.exam, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('universityApp:examUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.data = false;
        vm.datePickerOpenStatus.deadline = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
