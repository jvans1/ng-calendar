'use strict';
angular.module('ng.calendar', [])
  .directive("calendar", [ '$timeout',  '$compile', function($timeout, $compile){
    var page = {
      scope: null,
      eventCount: 0,
      times: undefined ,
      addEvent: function(calEvent, index){
        this.eventCount ++
        var timeArray = calEvent.startTime.split(":")
        var time;
        var hour = timeArray.shift()
        var minutes = this.roundMinutes(timeArray.shift())
        if (hour !== undefined && minutes !== undefined) {
          time = hour + minutes
        }else if(hour !== undefined && minutes === undefined){
          time = hour + "00"
        }else{
          time = "0000"
        }
        var el = document.body.querySelector("td[id='" + time + "']");
        var variable = this.createVariable(calEvent)
        modifiedEl = angular.element(el)
        modifiedEl.html("<cal-event action=\"eventClick({event: event})\"  source=" + variable  + " ></cal-event>")
        return modifiedEl
      },
      createVariable: function(calEvent){
        var variable = 'calEvent' + this.eventCount
        eval('this.scope.' + variable + '=calEvent') 
        return variable
      },
      hourSlots: function(hourDivide){
        if (this.times !== undefined) {
          return this.times
        };
        var minutesInHour = 60
        var times = []
        var slots = minutesInHour / hourDivide
        for(var i = 0; i < slots; i ++){
          var value = (minutesInHour/slots * (i + 1)).toString()
          var time;
          if (value.length < 2) {
            time = "0" + value
          }else{
            time = value
          }
          times.push(time)
        }
        this.times = times
        return times
      },
      roundMinutes: function(minutes){
        var roundedTime = this.times[0]
        for(var index = 0; index < this.times.length; index ++){
          if (minutes >= this.times[index]) {
            roundedTime = this.times[index + 1]
          }else{
            break
          }
        }
        return roundedTime
      }
    }
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
        // $scope.hourSlots = page.hourSlots($scope.calOptions.hourDivide)
        $scope.day = true;
        
        $scope.hours = [
                      "00", "00:30", "1", "1:30", "2", "2:30", "3", "3:30", "4", "4:30", "5", "5:30", "6", "6:30", "7", "7:30", "8", "8:30", "9", "9:30",
                      "10", "10:30", "11", "11:30", "12", "12:30", "13", "13:30", "14", "14:30", "15", "15:30", '16', "16:30",
                      "17", "17:30", "18", "18:30", "19", "19:30", "20", "20:30", "21", "21:30", "22", "22:30", "23", "23:30"
                    ]
        $scope.week = false;
        $scope.agenda = false;
        $scope.month = false;
        $scope.options = false;
      },
      link: function(scope, elem, attrs, ctrl){
        page.scope = scope
        $timeout(function(){
          angular.forEach(scope.events, function(calEvent, index){
            el = page.addEvent(calEvent, index)
            $compile(el)(scope)
            // el.addEvent(eventDirective)
          });
        }, 0)
        scope.events
      }
    }
  }]);