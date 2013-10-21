'use strict';
calendar.directive('calEvent',   function(){
    return {
      restrict: 'E',
      scope: {
        source: '=',
        eventClick: '&'
      },
      replace: true,
      templateUrl: './views/directives/cal_event.html'
    };
  }
);