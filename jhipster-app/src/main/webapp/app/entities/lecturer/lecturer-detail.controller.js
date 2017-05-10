(function() {
    'use strict';

    angular
        .module('universityApp')
        .controller('LecturerDetailController', LecturerDetailController);

    LecturerDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Lecturer'];

    function LecturerDetailController($scope, $rootScope, $stateParams, previousState, entity, Lecturer) {
        var vm = this;

        vm.lecturer = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('universityApp:lecturerUpdate', function(event, result) {
            vm.lecturer = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
