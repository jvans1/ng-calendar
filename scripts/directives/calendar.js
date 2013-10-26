calendar.directive("calendar", [ '$timeout',  '$compile', function($timeout, $compile){
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
      modifiedEl.html("<cal-event source=" + variable  + " ></cal-event>")
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
      var roundedTime;
      console.log(this.times)
      for(var index = 0; index < this.times.length; index ++){
        if (minutes >= this.times[index]) {
          roundedTime = this.times[index]
        }else{
          break
        }
      }
      console.log("returning roundedTime: " + roundedTime)
      return roundedTime
    }
  }
  return {
    restrict: "E",
    scope: {
      events: '=',
      calOptions: '='
    },
    replace: true,
    templateUrl: "./views/directives/calendar.html",
    controller: function($scope){
      $scope.hourSlots = page.hourSlots($scope.calOptions.hourDivide)

      $scope.day = true;
      $scope.hours = [
                      12,1,2,3,4,5,6,7,8,9,
                      10,11,12,13,14,15,16,
                      17,18,19,20,21,22,23
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
}])
