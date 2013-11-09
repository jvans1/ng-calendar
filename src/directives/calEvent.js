'use strict';
calendar.directive('calEvent',   function(){
    return {
      restrict: 'E',
      scope: {
        source: '=',
        action: '&',
        eventStyle: '@'
      },
      replace: true,
      templateUrl: 'cal_event.html'
    };
  }
);