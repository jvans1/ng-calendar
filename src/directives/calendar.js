'use strict';
var calendar = angular.module('ng.calendar', [])
  .directive("calendar", [ '$timeout',  '$compile', 'eventsService', function($timeout, $compile, eventsService){
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
        // $scope.newEvent = { }
        // $scope.addEvent = function(event){
        //   $scope.addEvents([event])
        // }
        $scope.addEvents = function(calEvents){
          eventsService.addEventsToQueue($scope, calEvents)
        }

        $scope.eventContainerStyle = function(){
          return "height: " +  ""
        }

        $scope.calHeight = function(){
          return "height: " + options.getCalendarHeight()
        }

        $scope.dividerRepeat = function(){
          var dividerCount = options.getHourSlots() - 1 
          return [0,1,2]
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
        $timeout(function(){
          scope.addEvents(scope.events)
          var eventsInQueue = eventsService.getCalendarEventQueue();
          for (var i = eventsInQueue.length - 1; i >= 0; i--) {
            var eventNode = eventsInQueue[i].htmlNode
            var compiledNode = $compile(eventNode)(scope)
            var eventContainer = angular.element(cal.findEventContainer());
            eventContainer.prepend(compiledNode)
          };
        })
      }
    }
  }]);