
(function() {
    'use strict';
    angular
        .module('main')
        .factory('courseExamService', courseExamService);

    courseExamService.$inject = ['$resource', '$stateParams'];

    function courseExamService ($resource, $stateParams) {
        var resourceUrl =  'api/exams';
        var parametro = $stateParams.id;
        console.log("parametro");
        console.log(parametro);
        console.log($stateParams.id); //per vederlo devo avere nello state '/courseExam/{id}'
        
        
        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', params: {courseId : parametro} , isArray: true},
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
