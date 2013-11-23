calendar.factory("eventsService", [ 'time', 'eventComparisonService', '$timeout', function(time, eventComparison, $timeout){
  var eventScopes = [], eventCount = 0;
  function eventVariable(){
      return 'calEvent' + eventCount
  }

  var configure = function(calendarScope, calEvent){
    // The purpose of this method is to create a unique
    // directive, attach it as a property on the event and 
    // return the event

    //increment eventcount so variables are unique
    //bind variable to scope
    eventCount ++
    var variable = eventVariable()
    calendarScope[variable] = calEvent
    var eventNode = "<cal-event location-class=" + cal.position.getNodeId() + " action=\"eventClick({event: event})\"  source=" + variable + "></cal-event>" 
    return eventNode
  }


  return {
      createDirectives: function(scope, calEvents){
          var directives = "";
          for (var i = calEvents.length - 1; i >= 0; i--) {
            var configuredEvent = configure(scope, calEvents[i] )
            directives += configuredEvent
          }
          return directives
        },
      storeScope: function(scope){
        eventScopes.push(scope)
      },
      resizeEvent: function(addedEvent){
        //Look at events that overlap from above
        //resize the second event 
        //fire another event to continue
        for (var i = eventScopes.length - 1; i >= 0; i--) {
          console.log("Comparing " + eventScopes[i].source.title + " " + addedEvent.source.title )

          var eventComparer = eventComparison(eventScopes[i], addedEvent )
          if ( eventComparer.sameEvent() ) {
            console.log("same event")
            continue
          }else if( eventComparer.overlapsFromTop() && eventComparer.sharesLeftAncher() ) {
            // var lastEvent = eventComparer.lastEvent()
            // console.log("Resizing " + lastEvent.source.title )
            // lastEvent.resize()
            // this.resizeEvent(lastEvent)
          };
        };
      }
    }
}]);
//look at events in calendar determine if overlap
//if one does resize the later event with the overlapCount
//increment the overlap event-count
// continue looking for events that overlap