(function() {
    'use strict';

    angular
        .module('universityApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('student', {
            parent: 'entity',
            url: '/student',
            data: {
                authorities: ['ROLE_USER','ROLE_STUDENT','ROLE_ADMOFFICE'],
                pageTitle: 'universityApp.student.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/student/students.html',
                    controller: 'StudentController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('student');
                    $translatePartialLoader.addPart('sex');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('student-detail', {
            parent: 'student',
            url: '/student/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'universityApp.student.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/student/student-detail.html',
                    controller: 'StudentDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('student');
                    $translatePartialLoader.addPart('sex');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Student', function($stateParams, Student) {
                    return Student.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'student',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('student-detail.edit', {
            parent: 'student-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/student/student-dialog.html',
                    controller: 'StudentDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Student', function(Student) {
                            return Student.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('student.new', {
            parent: 'student',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/student/student-dialog.html',
                    controller: 'StudentDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
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
                }).result.then(function() {
                    $state.go('student', null, { reload: 'student' });
                }, function() {
                    $state.go('student');
                });
            }]
        })
        .state('student.edit', {
            parent: 'student',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/student/student-dialog.html',
                    controller: 'StudentDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Student', function(Student) {
                            return Student.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('student', null, { reload: 'student' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('student.delete', {
            parent: 'student',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/student/student-delete-dialog.html',
                    controller: 'StudentDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Student', function(Student) {
                            return Student.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('student', null, { reload: 'student' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
