(function() {
    'use strict';

    angular
        .module('universityApp')
        .controller('CourseDetailController', CourseDetailController);

    CourseDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Course', 'Lecturer', 'Exam'];

    function CourseDetailController($scope, $rootScope, $stateParams, previousState, entity, Course, Lecturer, Exam) {
        var vm = this;

        vm.course = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('universityApp:courseUpdate', function(event, result) {
            vm.course = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
