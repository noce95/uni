
(function() {
    'use strict';
    angular
        .module('main')
        .controller('courseExamController', courseExamController);

    courseExamController.$inject = ['courseExamService', '$rootScope', '$scope', '$state', 'studentCourseService'];

    function courseExamController (courseExamService, $rootScope, $scope, $state, studentCourseService) {
       
        var vm = this;
        
        vm.salva = salva;
        var courseId = $rootScope.corso;
        var studentId = $rootScope.studentId;
        
        vm.exams = [];
        
        loadAll();  
        
        function loadAll() {
            courseExamService.query( {courseId : courseId} , function(result) {
                vm.exams = result;
                vm.searchQuery = null;
            });
            
        }
        
        $scope.iscrivi = function (examId){
            console.log("id dell esame");
            console.log(examId);
            console.log("id dello studente");
            console.log(studentId);
            console.log();
            //$state.go("courseExam", {courseId: courseId});
            
        };
        /*
        //da qui inventato per salvare.. ma sono solo tentativi */
        function salva () {
            vm.isSaving = true;
            /*
            if (vm.student.id !== null) {
                studentCourseService.update(vm.student, onSaveSuccess, onSaveError);
            } else {*/
                studentCourseService.save(vm.student, onSaveSuccess, onSaveError);
            //}
        }

        function onSaveSuccess (result) {
        }

        function onSaveError () {
        }
        /* fin qui */
        
        /*
        function prenota(){
            console.log("hai prenotato");
        }*/
    }
})();
