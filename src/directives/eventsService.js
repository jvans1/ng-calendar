calendar.factory("eventsService", [  function(){
  //Store events on calendar in array
  //when add another event check to see if overflops coordinates from pervious events
  //If yes, rerender all matching events
  //
  var eventsInQueue = []
  var eventCount = 0
  function eventVariable(calEvent){
      return 'calEvent' + calEvent.elemId
  }

  var configure = function(scope, calEvent){
    eventCount ++
    calEvent.elemId = eventCount
    //bind variable to scope
    scope[eventVariable(calEvent)] = calEvent
    var variable = eventVariable(calEvent)
    var eventNode = "<cal-event event-count= " + calEvent.elemId +  " location-class=" + cal.position.getNodeId() + " action=\"eventClick({event: event})\"  source=" + variable + "></cal-event>" 
    calEvent.htmlNode = eventNode
    return calEvent
  }

  return { 
    addEventsToQueue: function(scope, calEvents){
      for (var i = calEvents.length - 1; i >= 0; i--) {
        var configuredEvent = configure(scope, calEvents[i] )
        eventsInQueue.push(configuredEvent)
      }
    },
    getCalEventQueue: function(){
      return eventsInQueue
    }
  }
}]);