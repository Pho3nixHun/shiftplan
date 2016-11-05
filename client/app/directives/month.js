'use strict';
import template from "app/directives/month.html!text";
import dialogTemplate from "app/templates/shift.create.dialog.html!text";
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
                '$scope', '$mdDialog',
                function ($scope, $mdDialog) {
                    $scope.selectedDate = null;
                    $scope.startMonth = null;
                    $scope.startYear = null;
                    $scope.weekStartsOn = "firstDayOfWeek";
                    $scope.titleFormat = "MMMM y";
                    $scope.firstDayOfWeek = 1;
                    $scope.disableFutureSelection = false;
                    $scope.dayClick = function (date) {
                        console.log(`You clicked a day`, date);
                        $mdDialog.show({
                            controller: ['$scope', '$mdDialog', function($scope, $mdDialog){
                                $scope.answer = {};
                                $scope.types = [
                                    { start: 6, text: 'Day shift', length: 12},
                                    { start: 8, text: 'Normal shift', length: 8.5},
                                    { start: 18, text: 'Night shift', length: 12}
                                ]
                                $scope.hide = function() {
                                  $mdDialog.hide();
                                };
                            
                                $scope.cancel = function() {
                                  $mdDialog.cancel();
                                };
                            
                                $scope.answer = function(answer) {
                                  $mdDialog.hide(answer);
                                };
                          }],
                          template: dialogTemplate,
                          parent: angular.element(document.body),
                          clickOutsideToClose:true,
                          fullscreen: true
                        }).then(
                            (answer) => {
                                console.log(answer);
                                //Answered
                            }, 
                            () => {
                                //Canceled
                            });
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
