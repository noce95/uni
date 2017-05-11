(function() {
    'use strict';

    angular
        .module('main')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('addLecturer', {
            parent: 'app',
            url: '/addLecturer',
            data: {
                authorities: [],
                pageTitle: 'addLecturer.title'
            },
            views: {
                'pageContent': {
                    templateUrl: 'main/jhipster/entities/addLecturer/addLecturer.html',
                    controller: 'addLecturerController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: function () {
                    return {
                        name: null,
                        surname: null,
                        lecturerNumber: null,
                        id: null
                    };
                }
            }

        });
    }
})();
