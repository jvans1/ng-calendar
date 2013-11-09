angular.module("calendarDemo", ['ng.calendar']).controller('appCtrl',[ '$scope', function($scope){
  $scope.ballsack = "Balls!"
  $scope.calOptions = {
    hourDivide: 30,
  }
  $scope.alertIt = function(event){
    console.log(event)
  }
  $scope.events = [
    {
      startTime: '16:00:04',
      title: 'Booty call',
    },
    {
      startTime: '14:00:04',
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