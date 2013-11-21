angular.module("calendarDemo", ['ng.calendar']).controller('appCtrl',[ '$scope', function($scope){
  $scope.ballsack = "Balls!"
  $scope.calOptions = {
    hourSlots: 2,
  }
  $scope.alertIt = function(event){
    console.log(event)
  }
  $scope.events = [
    // {
    //   startTime: '14:00:04',
    //   endTime: "17:30:00",
    //   title: 'Booty call',
    // },
    {
      startTime: '16:04:04',
      endTime: "19:30:00",
      title: 'dinner',
    },
    {
      startTime: '17:00:04',
      endTime: '19:30:04',
      title: 'kickball'
    }
  ]
}])