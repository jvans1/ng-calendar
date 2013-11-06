'use strict';
var calendar = angular.module('ng.calendar', [])
  .directive("calendar", [ '$timeout',  '$compile', function($timeout, $compile){
    return {
      restrict: "E",
      scope: {
        events: '=',
        calOptions: '=',
        eventClick: '&'
      },
      replace: true,
      templateUrl: "./views/calendar.html",
      controller: function($scope){
        $scope.day = true;
        
        $scope.hours = [
                      "0000", "0030", "1000", "1300", "2000", "2300", "3000", "3300", "4000", "4300", "5000", "5300", "6000", "6300", "7000", "7300", "8000", "8300", "9000", "9300",
                      "1000", "1030", "1100", "1130", "1200", "1230", "1300", "1330", "1400", "1430", "1500", "1530", '1600', "1630",
                      "1700", "1730", "1800", "1830", "1900", "1930", "2000", "2030", "2100", "2130", "2200", "2230", "2300", "2330"
                    ]
        $scope.week = false;
        $scope.agenda = false;
        $scope.month = false;
        $scope.options = false;
      },
      link: function(scope, elem, attrs, ctrl){
        cal.event.setScope(scope)
        $timeout(function(){
          angular.forEach(scope.events, function(calEvent){
            var eventNode = cal.event.configure(calEvent);
            var table = angular.element(cal.findTableContainer());
            var result = $compile(eventNode)(scope)
            table.prepend(result)
          });
        }, 0)
        scope.events
      }
    }
  }]);