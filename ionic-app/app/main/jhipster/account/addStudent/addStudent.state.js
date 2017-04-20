(function() {
    'use strict';

    angular
        .module('main')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('addStudent', {
            parent: 'app',
            url: '/addStudent',
            data: {
                authorities: [],
                pageTitle: 'addStudent.title'
            },
            views: {
                'pageContent': {
                    templateUrl: 'main/jhipster/account/addStudent/addStudent.html',
                    controller: 'addStudentController',
                    controllerAs: 'vm'
                }
            }/*,
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('register');
                    return $translate.refresh();
                }]
            }*/
        });
    }
})();



