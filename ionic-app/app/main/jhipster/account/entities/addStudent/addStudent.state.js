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
                    templateUrl: 'main/jhipster/account/entities/addStudent/addStudent.html',
                    controller: 'addStudentController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('addStudent');
                    return $translate.refresh();
                }],
                    entity: function () {
                            return {
                                name: null,
                                surname: null,
                                sex: null,
                                dateOfBirth: null,
                                nationality: null,
                                studentNumber: null,
                                id: null
                            };
                        }
            }
        });
    }
})();



