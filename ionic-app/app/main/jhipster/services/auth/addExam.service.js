(function() {
    'use strict';
    angular
        .module('main')
        .factory('addExamService', addExamService);

    addExamService.$inject = ['$resource', 'Config'];

    function addExamService ($resource, Config) {
        var resourceUrl =  Config.ENV.SERVER_URL + 'api/exams';

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
