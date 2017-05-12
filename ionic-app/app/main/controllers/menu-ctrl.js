'use strict';
angular.module('main')
    .controller('MenuCtrl', function ($log, Auth, $state, Principal, LoginService, $window) {
        var vm = this;
        vm.login = LoginService.open;
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.logout = logout;

        function logout () {
            $window.location.reload();
            Auth.logout();
            $state.go('home');
            $window.location.reload(); //aggiunto per risolvere il problema della freccia quando si fa il logout
        }

    });
