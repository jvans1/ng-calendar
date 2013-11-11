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
      template: "<h1 class=\"tit\">balls</h1>", //'./cal_event.html',
      link: function(){
        alert("Balls")

      }
    };
  }
);