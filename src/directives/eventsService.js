calendar.factory("eventsService", [ '$compile', '$timeout', function($compile, $timeout){
  //Store events on calendar in array
  //when add another event check to see if overflops coordinates from pervious events
  //If yes, rerender all matching events
  //
  var eventsOnCalendar = []
  var eventCount = 0

  function bindToScope(scope, calEvent){
    eval('scope.' + eventVariable() + '=calEvent') 
    return true
  }
  function eventVariable(){
      return 'calEvent' + eventCount
  }
  function eventHeight(){
      var hourSlots = cal.configuration.getOptions()["hourSlots"]
      return 20 * hourSlots
  }
  function offsetX(){
    return " ;"
  }
  var configure = function(scope, calEvent, eventsSharingRow, index){
    widthPerEvent = 100.0 / eventsSharingRow 
    var yOffset = cal.position.dayEventOffset(calEvent).top
    var style = "height: " + eventHeight() + "px; position: absolute;background: yellow;top:" + yOffset + "px; left: " + widthPerEvent * index + "%; " ;
    style += "width: " + widthPerEvent + "%;"
    bindToScope(scope, calEvent);
    var variable = eventVariable()
    var eventNode = "<cal-event event-count= " + calEvent.elemId +  " location-class=" + cal.position.getNodeId() + " action=\"eventClick({event: event})\"  source=" + variable + " style=\"" + style + "\" ></cal-event>" 
    return eventNode 
  }

  function sharedSpace(event){
    var eventOffset = cal.position.dayEventOffset(event)
    var coOrdinates
    eventsInSpace = [event]
    for (var i = eventsOnCalendar.length - 1; i >= 0; i--) {
      coOrdinates = cal.position.dayEventOffset(eventsOnCalendar[i])
      if (eventOffset.top <= coOrdinates.top + 20 && eventOffset.top >= coOrdinates.top - 20 ){
        eventsInSpace.push(eventsOnCalendar[i])
      }
    };
    return eventsInSpace
  }

  return { 
    addEventsToCalender: function(scope, calEvents){
      for (var i = calEvents.length - 1; i >= 0; i--) {
        eventCount ++ 
        var calEvent = calEvents[i]
        var eventsInSpace = sharedSpace(calEvent)
        console.log("really")
        for (var e = eventsInSpace.length - 1; e >= 0; e --) {
          angular.forEach(eventsOnCalendar, function(calEvent, index){
            // if(calEvent.startTime == eventsInSpace[i].startTime && calEvent.startTime.title == eventsInSpace[i].title ) {
            //   console.log("removing itmem")
            //   eventsOnCalendar.splice(index,1);
            //   return false;
            // }
          });          
          eventsInSpace[e].htmlNode = configure(scope, eventsInSpace[e], eventsInSpace.length, e)
          eventsOnCalendar.push(eventsInSpace[e])
          console.log("Eis: ", e)
          console.log(eventsOnCalendar.length)
        }
      }
    },
    getCalendarEvents: function(){
      return eventsOnCalendar
    }
  }
}]);