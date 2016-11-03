'use strict';
import template from "app/directives/month.html!text";
import "angular-material-calendar";

(function (angular, template) {
    angular.module('shiftplan.month', ['materialCalendar']).directive('month', function () {
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
                selectedDate: '=?'
            },
            link: function ($scope) {
                
            },
            controller: [
                '$scope',
                function ($scope) {
                    $scope.selectedDate = null;
                    $scope.startMonth = null;
                    $scope.startYear = null;
                    $scope.weekStartsOn = "firstDayOfWeek";
                    $scope.titleFormat = "MMMM y";
                    $scope.firstDayOfWeek = 1;
                    $scope.disableFutureSelection = false;
                    $scope.dayClick = function (date) {
                        console.log(`You clicked a day`, date);
                    }
                    $scope.prevMonth = function (date) {
                        console.log(`You clicked (prev) month`, date);
                    };
                    $scope.nextMonth = function (date) {
                        console.log(`You clicked (next) month`, date);
                    };
                    $scope.setDayContent = setDayContent;
                    function setDayContent(date) {
                        // You would inject any HTML you wanted for
                        // that particular date here.
                        return "<p>Set from CODE</p>";
                    };
                }
            ]
        };
    });
})(angular, template)
