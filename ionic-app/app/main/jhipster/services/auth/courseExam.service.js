
(function() {
    'use strict';
    angular
        .module('main')
        .factory('courseExamService', courseExamService);

    courseExamService.$inject = ['$resource'];

    function courseExamService ($resource) {
        var resourceUrl =  'api/exams/:id';
        //var resourceUrl =  'api/exams';

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
