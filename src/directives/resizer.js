calendar.directive("resizer", function(){
  return { 
    restrict: "A",
    replace: true,
    scope: {
      setHeight: "&resizer"
    },
    template: "<div ng-mousedown=\"\" class=\"resizer\"> Resize me </div>",
    controller: function($scope){
      // $scope.resize = function(event){
      //   $scope.setHeight(event.clientY)
      // }
    },
    link: function(){

    }
  }
});