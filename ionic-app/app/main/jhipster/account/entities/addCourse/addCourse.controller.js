(function() {
    'use strict';

    angular
        .module('main')
        .controller('addCourseController', addCourseController);

    addCourseController.$inject = ['entity', 'addCourseService','$window','$timeout'];

    function addCourseController (entity, addCourseService, $window, $timeout) {
        var vm = this;

        vm.course = entity;
        vm.save = save;
        
        vm.showForm=true;
        vm.showMsg=false;
        
        function save () {
            vm.isSaving = true;
            if (vm.course.id !== null) {
                addCourseService.update(vm.course, onSaveSuccess, onSaveError);
            } else {
                addCourseService.save(vm.course, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {/*
            $scope.$emit('universityApp:courseUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;*/
            console.log("corso inserito correttamente");
            vm.showForm=false;
            vm.showMsg=true;
            
            $timeout (function (){
                //console.log("sono in ricalcola");
                $window.location.reload();
            }, 2000);
        }

        function onSaveError () {
            //vm.isSaving = false;
            console.log("ancora cazzi");
        }


    }
})();
