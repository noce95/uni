(function() {
    'use strict';
    angular
        .module('main')
        .factory('addStudentService', addStudentService);

    addStudentService.$inject = ['$resource', 'DateUtils'];

    function addStudentService ($resource, DateUtils) {
        var resourceUrl =  'api/students/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.dateOfBirth = DateUtils.convertLocalDateFromServer(data.dateOfBirth);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.dateOfBirth = DateUtils.convertLocalDateToServer(copy.dateOfBirth);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.dateOfBirth = DateUtils.convertLocalDateToServer(copy.dateOfBirth);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
