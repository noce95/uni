(function() {
    'use strict';
    angular
        .module('main')
        .factory('addLecturerService', addLecturerService);

    addLecturerService.$inject = ['$resource', 'Config'];

    function addLecturerService ($resource, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + 'api/lecturers';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
