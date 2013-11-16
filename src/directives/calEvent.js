'use strict';
calendar.directive('calEvent',   function(){
    return {
      restrict: 'E',
      scope: {
        source: '=',
        action: '&',
        locationClass: '@',
        eventCount: '@',
        defaultStyle: '@',
      },
      replace: true,
      templateUrl: './cal_event.html',
      controller: function($scope){
        $scope.style = {}
        $scope.setStyle = function(newStyle){
          return newStyle.attributes || {}
        }
        // this.adjustHeight = function(newHeight){
        //   style = $scope.style.split(";").splice(1)
        //   style.push( " height: " + newHeight)
        //   console.log($scope.style)
        //   // console.log(style.join("; "))
        // }
      },
      link: function(scope, elem, attrs, ctrl){
        var style = {
          "top" : cal.position.dayEventOffset(scope.source).top +  "px",
          "left" : "0%",
          "width" : "100%",
          "height" : "22px",
          "position" : "absolute",
          "background" : "yellow"
        };
        scope.style.attributes = style
      }
    };
  }
);
