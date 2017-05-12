
(function() {
    'use strict';

    angular
        .module('main')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('courseExam', {
            parent: 'app',
            url: '/courseExam',
            data: {
                authorities: ['ROLE_STUDENT','ROLE_ADMIN','ROLE_ADMOFFICE'],
                pageTitle: 'courseExam.title'
            },
            views: {
                'pageContent': {
                    templateUrl: 'main/jhipster/account/courseExam/courseExam.html',
                    controller: 'courseExamController',
                    controllerAs: 'vm'
                }
            }
        });
    };    

})();

