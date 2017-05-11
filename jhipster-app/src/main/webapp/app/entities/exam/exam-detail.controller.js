(function() {
    'use strict';

    angular
        .module('universityApp')
        .controller('ExamDetailController', ExamDetailController);

    ExamDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Exam', 'Course', 'Student'];

    function ExamDetailController($scope, $rootScope, $stateParams, previousState, entity, Exam, Course, Student) {
        var vm = this;

        vm.exam = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('universityApp:examUpdate', function(event, result) {
            vm.exam = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
