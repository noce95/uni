(function() {
    'use strict';

    angular
        .module('main')
        .controller('addCourseController', addCourseController);

    addCourseController.$inject = ['$window','$timeout', '$scope', '$stateParams', 'entity', 'addCourseService'];

    function addCourseController ($window, $timeout, $scope, $stateParams, entity, addCourseService) {
        var vm = this;
        vm.corsosalvato = true;
        vm.corsoavviso = false;
        vm.course = entity;
        vm.save = save;

        function save () {
            vm.isSaving = true;
            if (vm.course.id !== null) {
                addCourseService.update(vm.course, onSaveSuccess, onSaveError);
            } else {
                addCourseService.save(vm.course, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            /*$scope.$emit('universityApp:courseUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;*/
            vm.corsosalvato = false;
            vm.corsoavviso = true;
            $timeout(function () {
                $window.location.reload();
            }, 1500);
        }

        function onSaveError () {
            vm.isSaving = false;
        }
    }
})();
