
(function() {
    'use strict';

    angular
        .module('main')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('studentCourse', {
            parent: 'app',
            url: '/studentCourse',
            data: {
                authorities: ['ROLE_STUDENT','ROLE_ADMIN','ROLE_ADMOFFICE'],
                pageTitle: 'studentCourse.title'
            },
            views: {
                'pageContent': {
                    templateUrl: 'main/jhipster/account/studentCourse/studentCourse.html',
                    controller: 'studentCourseController',
                    controllerAs: 'vm'
                }
            }
        });
    };    

})();

