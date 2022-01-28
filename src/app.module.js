////import './styles.less';
////import './styles.scss';
//////COLO UI Design bootstrap override
////import './assets/css/cf-theme.less';
import '../node_modules/@comforth/webapi--design/dist/scss/index.scss';

//import "angular-sanitize";
//import "angular-cookies";
//import "angular-translate";
//import "angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files.js";
//import "angular-translate/dist/angular-translate-storage-cookie/angular-translate-storage-cookie.js";

var app = angular.module('app',[
    //'ngRoute',
    //'cf.webapi',
    //'mam.lib',
    'kendo.directives',
//    'nvd3',
//    'ngWebSocket',
//    'rx',
//    'pascalprecht.translate'
]);

app.run([
 function(){

    console.log('app started...');

    kendo.culture("en-EN");
   
}]);

/** Read the config file then bootstrap angular manually */
$.ajax({
    url: 'app.config.json'
}).fail((error) => {
    console.warn('Failed to load app.config.json config file!', error);
}).done((config) => {    
    app.constant('appConfig', config);
    console.log('app.config.json config file successfully loaded.');
    document.title = config.pageTitle || '';
}).always(() => {
    if(app.constant('appConfig') === undefined) {
        app.constant('appConfig', {});
    }
    $( document ).ready(function() {
        console.log("Bootstrapping app...");
        angular.bootstrap(document, ['app']);
    });    
});

require('./app.component');

