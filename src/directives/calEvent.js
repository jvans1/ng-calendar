'use strict';
calendar.directive('calEvent',   function(){
    return {
      restrict: 'E',
      scope: {
        source: '=',
        action: '&',
        locationClass: '@',
        eventCount: '@',
      },
      replace: true,
      templateUrl: './cal_event.html',
    };
  }
);