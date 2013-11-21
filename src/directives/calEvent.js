'use strict';
calendar.directive('calEvent', [ 'config', 'time', 'eventsService', function(config, time, events){
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

        $scope.height = function(){
          return $scope.eventMinutes() * time.pixelsPerMinute()
        }

        $scope.eventMinutes = function(){
          if ($scope.source.startTime && $scope.source.endTime) {
            return time.minutes($scope.source.endTime) - time.minutes($scope.source.startTime) 
          }else{
            return config.cellHeightToInt()
          };
        }
        $scope.resize = function(){
          var newSize = this.leftAlignmentInt() + ((100 - this.leftAlignmentInt()) / 2)
          this.style.attributes.left = newSize + "%"
          this.style.attributes.width = newSize + "%"
          this.style.attributes.zIndex = 1
          return this
        }

        $scope.leftAlignmentInt = function(){
          var attributes = this.style.attributes
          var currentSize = (attributes && parseInt( attributes.left.split("%").first)) || 0
          return currentSize
        }

        $scope.top = function(){
          return cal.position.dayEventOffset($scope.source).top
        } 

        $scope.setHeight = function(height){
          $scope.style.height = height
        }

        $scope.configureStyle = function(){          
          var style = {
            //add in units here as we need the raw numbers for calculations elsewhere
            "top" : $scope.top() +  "px",
            "left" : $scope.leftAlignmentInt() + "%",
            "width" : "100%",
            "height" : $scope.height() + "px",
            "position" : "absolute",
            "background" : "grey"
          }
          $scope.style.attributes = style
        }
 
      },
      link: function(scope, elem, attrs, ctrl){
        var style = scope.configureStyle(), calEvent = scope.source;
        calEvent.scope = scope
        calEvent.resize = function(){
          this.scope.resize(1)
        }
        events.storeEvent(calEvent)
        scope.$emit("EVENT_CHANGE", calEvent)
      }
    };
  }
]);
