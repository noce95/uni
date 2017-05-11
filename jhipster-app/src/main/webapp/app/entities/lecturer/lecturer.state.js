(function() {
    'use strict';

    angular
        .module('universityApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('lecturer', {
            parent: 'entity',
            url: '/lecturer',
            data: {
                authorities: [],
                pageTitle: 'universityApp.lecturer.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/lecturer/lecturers.html',
                    controller: 'LecturerController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('lecturer');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('lecturer-detail', {
            parent: 'lecturer',
            url: '/lecturer/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'universityApp.lecturer.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/lecturer/lecturer-detail.html',
                    controller: 'LecturerDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('lecturer');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Lecturer', function($stateParams, Lecturer) {
                    return Lecturer.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'lecturer',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('lecturer-detail.edit', {
            parent: 'lecturer-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/lecturer/lecturer-dialog.html',
                    controller: 'LecturerDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Lecturer', function(Lecturer) {
                            return Lecturer.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('lecturer.new', {
            parent: 'lecturer',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/lecturer/lecturer-dialog.html',
                    controller: 'LecturerDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
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
                }).result.then(function() {
                    $state.go('lecturer', null, { reload: 'lecturer' });
                }, function() {
                    $state.go('lecturer');
                });
            }]
        })
        .state('lecturer.edit', {
            parent: 'lecturer',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/lecturer/lecturer-dialog.html',
                    controller: 'LecturerDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Lecturer', function(Lecturer) {
                            return Lecturer.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('lecturer', null, { reload: 'lecturer' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('lecturer.delete', {
            parent: 'lecturer',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/lecturer/lecturer-delete-dialog.html',
                    controller: 'LecturerDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Lecturer', function(Lecturer) {
                            return Lecturer.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('lecturer', null, { reload: 'lecturer' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
