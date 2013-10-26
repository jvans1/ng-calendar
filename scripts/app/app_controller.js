calendar.controller('appCtrl',[ '$scope', function($scope){
  $scope.ballsack = "Balls!"
  $scope.calOptions = {
    hourDivide: 30,
    height: 1000,
  }

  $scope.events = [
    {
      startTime: '17:56:04',
      title: 'Booty call',
    },
    {
      startTime: '6:12:04',
      title: 'dinner',
    },
    {
      startTime: '10:05:04',
      title: 'kickball'
    }
  ]
}])