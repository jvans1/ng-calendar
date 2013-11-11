calendar.factory("eventsService", [ function(){
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
    eventCount ++
    calEvent.elemId = eventCount
    widthPerEvent = 100.0 / eventsSharingRow 
    var yOffset = cal.position.dayEventOffset(calEvent).top
    var style = "height: " + eventHeight() + "px; position: absolute;background: yellow;top:" + yOffset + "px; left: " + widthPerEvent * index + "%; " ;
    style += "width: " + widthPerEvent + "%;"
    bindToScope(scope, calEvent);
    var variable = eventVariable()
    var eventNode = "<cal-event event-count=\"" + calEvent.elemId +  "\" location-class=\"" + cal.position.getNodeId() + "\" action=\"eventClick({event: event})\"  source=\"" + variable + "\" style=\"" + style + "\" ></cal-event>" 
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
      if(calEventOnCalendar.startTime == calEvent.startTime && calEventOnCalendar.title == calEvent.title ) {
        eventsOnCalendar.splice(index,1);
        return false;
      }
    }); 
  }
  function addEventToQueue(scope, calEvent){
    // find all events that are going to overlap this events space
    var eventsInSpace = sharedSpace(calEvent)
    for (var e = eventsInSpace.length - 1; e >= 0; e --) {
      var eventToAdd = eventsInSpace[e]
      //remove the previous configuration from the queue if it's already there
      removeEventFromQueue( eventToAdd )         
      //reconfigure or configure html node and assign it to the object
      eventToAdd.htmlNode = configure(scope, eventToAdd, eventsInSpace.length, e)
      //add event object to queue
      eventsOnCalendar.push(eventToAdd)
    }
  }

  return { 
    addEventsToQueue: function(scope, calEvents){
      for (var i = calEvents.length - 1; i >= 0; i--) {
        addEventToQueue(scope, calEvents[i])
      }
    },
    getCalendarEventQueue: function(){
      return eventsOnCalendar
    }
  }
}]);