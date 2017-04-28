(function() {
    'use strict';

    angular
        .module('main')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('addCourse', {
            parent: 'app',
            url: '/addCourse',
            data: {
                authorities: ['ROLE_ADMOFFICE'],
                pageTitle: 'addCourse.title'
            },
            views: {
                'pageContent': {
                    templateUrl: 'main/jhipster/account/entities/addCourse/addCourse.html',
                    controller: 'addCourseController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('addCourse');
                        return $translate.refresh();
                }],
                    entity: function () {
                            return {
                                code: null,
                                name: null,
                                description: null,
                                cfu: null,
                                duration: null,
                                id: null
                            };
                        }
                    }
        });
    }
})();
