(function() {
    'use strict';
    angular
        .module('universityApp')
        .factory('Exam', Exam);

    Exam.$inject = ['$resource', 'DateUtils'];

    function Exam ($resource, DateUtils) {
        var resourceUrl =  'api/exams/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.data = DateUtils.convertLocalDateFromServer(data.data);
                        data.deadline = DateUtils.convertLocalDateFromServer(data.deadline);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.data = DateUtils.convertLocalDateToServer(copy.data);
                    copy.deadline = DateUtils.convertLocalDateToServer(copy.deadline);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.data = DateUtils.convertLocalDateToServer(copy.data);
                    copy.deadline = DateUtils.convertLocalDateToServer(copy.deadline);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
