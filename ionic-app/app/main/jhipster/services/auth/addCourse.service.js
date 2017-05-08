(function() {
    'use strict';
    angular
        .module('main')
        .factory('addCourseService', addCourseService);

    addCourseService.$inject = ['$resource', 'Config'];

    function addCourseService ($resource, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + 'api/courses';

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
