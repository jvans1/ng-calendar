calendar.directive("calendar", [ '$timeout', '$compile', function($timeout, $compile){
  var page = {
    scope: null,
    eventCount: 0,
    addEvent: function(calEvent, index){
      this.eventCount ++
      var el = document.body.querySelector("td[id='" + calEvent.time + "hour']");
      var variable = this.createVariable(calEvent)
      modifiedEl = angular.element(el)
      modifiedEl.html("<cal-event source=" + variable  + " ></cal-event>")
      return modifiedEl
    },
    createVariable: function(calEvent){
      var variable = 'calEvent' + this.eventCount
      eval('this.scope.' + variable + '=calEvent') 
      return variable
    }
  }
  return {
    restrict: "E",
    scope: {
      events: '='
    },
    replace: true,
    templateUrl: "./views/directives/calendar.html",
    controller: function($scope){
      $scope.day = true;
      $scope.hours = [
                      0,1,2,3,4,5,6,7,8,9,
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
