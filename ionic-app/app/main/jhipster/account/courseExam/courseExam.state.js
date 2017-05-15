
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
            url: '/courseExam/{id}',
            //url: '/courseExam',
            /*
            params: {
                'prova1': 'prova1',
                'prova2': 'asdgasd',
                '3prova3': '3prova3'
            },
            */
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
            }/*,
            resolve: {
                entity: ['$stateParams', 'courseExamService', function($stateParams, courseExamService) {
                    return courseExamService.get({id : $stateParams.id}).$promise;
                }]
            } */  
            
        });
    };    

})();

