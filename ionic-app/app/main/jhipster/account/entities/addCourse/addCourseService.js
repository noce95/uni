(function() {
    'use strict';
    angular
        .module('main')
        .factory('addCourseService', addCourseService);

    addCourseService.$inject = ['$resource'];

    function addCourseService ($resource) {
        var resourceUrl =  'api/courses/:id';

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
