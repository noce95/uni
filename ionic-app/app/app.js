'use strict';
angular.module('university', [
    // load your modules here
    'main', // starting with the main module
]).run(run);
run.$inject = ['stateHandler', 'translationHandler'];

function run(stateHandler, translationHandler) {
    stateHandler.initialize();
        translationHandler.initialize();
}
