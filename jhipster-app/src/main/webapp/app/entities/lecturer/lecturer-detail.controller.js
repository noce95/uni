(function() {
    'use strict';

    angular
        .module('universityApp')
        .controller('LecturerDetailController', LecturerDetailController);

    LecturerDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Lecturer', 'Course', 'User'];

    function LecturerDetailController($scope, $rootScope, $stateParams, previousState, entity, Lecturer, Course, User) {
        var vm = this;

        vm.lecturer = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('universityApp:lecturerUpdate', function(event, result) {
            vm.lecturer = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
