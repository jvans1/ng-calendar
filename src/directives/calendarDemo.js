angular.module("calendarDemo", ['ng.calendar']).controller('appCtrl',[ '$scope', function($scope){
  $scope.ballsack = "Balls!"
  $scope.calOptions = {
    hourDivide: 30,
  }

  $scope.events = [
    {
      startTime: '17:56:04',
      title: 'Booty call',
    },
    {
      startTime: '18:12:04',
      title: 'dinner',
    },
    {
      startTime: '18:35:04',
      title: 'kickball'
    }
  ]

  $scope.alertMe = function(event){
  }
}])