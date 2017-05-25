
(function() {
    'use strict';
    angular
        .module('main')
        .controller('courseExamController', courseExamController);

    courseExamController.$inject = ['courseExamService', 'addExamService', 'addStudentService', '$rootScope', '$scope'];

    function courseExamController (courseExamService, addExamService, addStudentService, $rootScope, $scope) {
       
        var vm = this;
        var studente = {};
        var esame = [];
        var array = [];
        var a = {};
        
        var courseId = $rootScope.corso;
        var studentId = $rootScope.studentId;
        
        vm.exams = [];
        
        loadAll();  
        
        function loadAll() {
            courseExamService.query( {courseId : courseId} , function(result) {
                vm.exams = result;
                //console.log(vm.exams);
                vm.searchQuery = null;
            });
        }
        
        addStudentService.query(function(result) {
                studente = result[0]; //studente che vuole iscriversi all'esame
                //console.log(result[0]);
                //console.log(studente);
                vm.searchQuery = null;
            });
        
        
        $scope.iscrivi = function (examId){
            esame = vm.exams[examId]; //esame al quale lo studente va iscritto
            console.log(esame.students.length);
            for (var i=0 ; i<esame.students.length; i++){
                a=esame.students[i];
                if(a.id===studente.id){
                    console.log("sei gia iscritto");
                    return;
                }
                else{
                    array=esame.students; //copio l'array
                    array.push(studente); //aggiungo lo studente all'array
                    esame.students=array; // ricopio l'array aggionranto
                    addExamService.update(esame); // faccio l'update dell'esame con il nuovo studente
                }
            }
            if(esame.students.length===0){ //caso in cui si è i primi ad iscriversi
                array=esame.students; //copio l'array
                array.push(studente); //aggiungo lo studente all'array
                esame.students=array; // ricopio l'array aggionranto
                addExamService.update(esame); // faccio l'update dell'esame con il nuovo studente
            }
        };
    }
})();
