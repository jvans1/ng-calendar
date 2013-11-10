'use strict';
var calendar = angular.module('ng.calendar', [])
  .directive("calendar", [ '$timeout',  '$compile', function($timeout, $compile){
    return {
      restrict: "E",
      scope: {
        events: '=',
        options: '=',
        eventClick: '&'
      },
      replace: true,
      templateUrl: "calendar.html",
      controller: function($scope){
        cal.configuration.userOptions = $scope.options
        var options = cal.configuration
        $scope.timeToId = function(time){
          var newTime = time.replace(":", "")
          return "hour" + newTime
        }

        $scope.dividerHeight = function(){
          return "height: " + options.cellHeightToInt() + "px;"
        }

        $scope.calHeight = function(){
          return "height: " + options.getCalendarHeight()
        }

        $scope.dividerRepeat = function(){
          var dividerCount = options.getHourSlots() - 1 
          return new Array(dividerCount)
        }
        $scope.hourHeight = function(){
          return "height: " + options.cellHeightToInt() * options.getHourSlots() + "px;"
        }
        $scope.day = true;
        
        $scope.hours = [
                      "00:00",  "01:00", "02:00",  "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00",
                      "10:00", "11:00", "12:00",  "13:00",  "14:00",  "15:00", '16:00', 
                      "17:00",  "18:00",  "19:00",  "20:00",  "21:00",  "22:00",  "23:00"
                      ]
        $scope.week = false;
        $scope.agenda = false;
        $scope.month = false;
      },
      link: function(scope, elem, attrs, ctrl){
        cal.event.setScope(scope)
        $timeout(function(){
          angular.forEach(scope.events, function(calEvent){
            var eventNode = cal.event.configure(calEvent);
            var result = $compile(eventNode)(scope)
            var eventContainer = angular.element(cal.findEventContainer());
            eventContainer.prepend(result)
          });          
        })
      }
    }
  }]);