calendar.factory("eventsService", [ '$compile', '$timeout', function($compile, $timeout){
  //Store events on calendar in array
  //when add another event check to see if overflops coordinates from pervious events
  //If yes, rerender all matching events
  //
  var eventsOnCalendar = []
  var eventCount = 0
  function eventVariable(calEvent){
      return 'calEvent' + calEvent.elemId
  }
  function eventHeight(){
      var hourSlots = cal.configuration.getOptions()["hourSlots"]
      return 20 * hourSlots
  }
  function offsetX(){
    return " ;"
  }
  var configure = function(scope, calEvent, eventsSharingRow, index){
    eventCount ++
    calEvent.elemId = eventCount
    widthPerEvent = 100.0 / eventsSharingRow 
    var yOffset = cal.position.dayEventOffset(calEvent).top
    var style = "height: " + eventHeight() + "px; position: absolute;background: yellow;top:" + yOffset + "px; left: " + widthPerEvent * index + "%; " ;
    style += "width: " + widthPerEvent + "%;"
    scope[eventVariable(calEvent)] = calEvent
    var variable = eventVariable(calEvent)
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
  function removeEventFromQueue(calEvent){
    angular.forEach(eventsOnCalendar, function(calEventOnCalendar, index){
        console.log(calEventOnCalendar.startTime)
        console.log(calEvent.startTime)
      if(calEventOnCalendar.startTime == calEvent.startTime && calEventOnCalendar.title == calEvent.title ) {
        eventsOnCalendar.splice(index,1);
        return false;
      }
    }); 
  }
  function addEventToCalendar(scope, calEvent){
    var eventsInSpace = sharedSpace(calEvent)
    for (var e = eventsInSpace.length - 1; e >= 0; e --) {
      removeEventFromQueue( eventsInSpace[e] )         
      eventsInSpace[e].htmlNode = configure(scope, eventsInSpace[e], eventsInSpace.length, e)
      eventsOnCalendar.push(eventsInSpace[e])
      console.log(eventsOnCalendar.length)
    }
  }

  return { 
    addEventsToCalender: function(scope, calEvents){
      for (var i = calEvents.length - 1; i >= 0; i--) {
        addEventToCalendar(scope, calEvents[i])
      }
    },
    getCalendarEvents: function(){
      return eventsOnCalendar
    }
  }
}]);