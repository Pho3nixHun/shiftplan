'use strict';
import "angular-material/angular-material.css!";
import "resources/css/animate.css!";
import "resources/css/stylesheet.css!";
import "resources/fonts/material-icons.css!";

// Libraries
import "angular-animate";
import "angular-material";
import "angular-messages";
import "angular-resource";
import "angular-route";
import "angular-sanitize";
import "api-check";
import "angular-formly";
import "angular-formly-material";

// App related
import "app/directives/month";
import mdThemingConfig from 'app/configs/mdTheme';
import template from "app/directives/app.html!text";

(function (angular, template) {
    angular.module('shiftplan', [
        'ngMaterial',
        'ngAnimate',
        'ngRoute',
        'ngResource',
        'formly',
        'formlyMaterial',
        'shiftplan.month'
    ])
    .config(mdThemingConfig)
    .directive('app', function () {
        /*
        * & function
        * @ string
        * = object
        */
        return {
            restrict: 'E',
            template: template,
            replace: true,
            scope: {
                
            },
            link: function ($scope) {

            },
            controller: [
                '$scope', '$mdSidenav',
                function ($scope, $mdSidenav) {
                    $scope.title = "Hello World!";
                    $scope.toggleSideNav = function () {
                        $mdSidenav('left').toggle();
                    }
                    $scope.isSideNavLockOpen = () => $mdSidenav('left').isLockedOpen();
                    $scope.isSideNavOpen = () => $mdSidenav('left').isOpen();
                }
            ]
        };
    });
})(angular, template)
