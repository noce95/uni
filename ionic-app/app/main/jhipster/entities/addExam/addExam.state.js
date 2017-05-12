(function() {
    'use strict';

    angular
        .module('main')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('addExam', {
            parent: 'app',
            url: '/addExam',
            data: {
                authorities: ['ROLE_ADMIN','ROLE_ADMOFFICE','ROLE_LECTURER'],
                pageTitle: 'addExam.title'
            },
            views: {
                'pageContent': {
                    templateUrl: 'main/jhipster/entities/addExam/addExam.html',
                    controller: 'addExamController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: function () {
                    return {
                        data: null,
                        hour: null,
                        classroom: null,
                        duration: null,
                        deadline: null,
                        id: null
                    };
                }
            }

        });
    }
})();
