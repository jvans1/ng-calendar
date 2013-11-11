angular.module("calendarDemo", ['ng.calendar']).controller('appCtrl',[ '$scope', function($scope){
  $scope.ballsack = "Balls!"
  $scope.calOptions = {
    hourSlots: 4,
  }
  $scope.alertIt = function(event){
  }
  $scope.events = [
    {
      startTime: '14:00:04',
      title: 'Booty call',
    },
    {
      startTime: '14:04:04',
      title: 'dinner',
    },
    {
      startTime: '14:25:04',
      title: 'kickball'
    }
  ]
}])