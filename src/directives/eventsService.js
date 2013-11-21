calendar.factory("eventsService", [ 'time', 'eventComparisonService', '$timeout', function(time, eventComparison, $timeout){
  var eventCount = 0,
      calendarEvents = [];
  function eventVariable(calEvent){
      return 'calEvent' + calEvent.elemId
  }

  var configure = function(scope, calEvent){
    // The purpose of this method is to create a unique
    // directive, attach it as a property on the event and 
    // return the event

    //increment eventcount so variables are unique
    eventCount ++
    calEvent.elemId = eventCount
    //bind variable to scope
    scope[eventVariable(calEvent)] = calEvent
    var variable = eventVariable(calEvent)
    var eventNode = "<cal-event event-count= " + calEvent.elemId +  " location-class=" + cal.position.getNodeId() + " action=\"eventClick({event: event})\"  source=" + variable + "></cal-event>" 
    return eventNode
  }


  return {
      eventComparison: eventComparison,
      createDirectives: function(scope, calEvents){
          var directives = "";
          for (var i = calEvents.length - 1; i >= 0; i--) {
            var configuredEvent = configure(scope, calEvents[i] )
            directives += configuredEvent
          }
          return directives
        },
      resizeEvents: function(){
        var scope, resized = false;
        //Look at events that overlap from above
        //resize the second event 
        //fire another event to continue
        for (var i = calendarEvents.length - 1; i > 0; i--) {
          console.log(i)
          console.log(calendarEvents.length)
          console.log("Comparing " + calendarEvents[i].title + " " + calendarEvents[i -1].title )
          var eventComparison = this.eventComparison(calendarEvents[i], calendarEvents[ i - 1 ] )
          if ( eventComparison.sameEvent() ) {
            continue
          }else if( eventComparison.overlapsFromTop() && eventComparison.sharesLeftAncher() ) {
            var event = eventComparison.lastEvent()
            scope = event.scope
            resized = true
            console.log(eventComparison.lastEvent().title)
            // THis creates an infinite loop because
            // the array of events we keep track of doesn't update
            // the values of scope.style.attributes.left so thiseventComparison.sharesLeftAncher()
            // always returns true

            $timeout(function(){
              scope.$emit("EVENT_CHANGE");
            })
            scope.resize()
            angular.forEach(calendarEvents, function(calEvent, index){
              console.log(index)
              if (calEvent.elemId === event.elemId ) {
                calendarEvents.splice(index, 1)
              };
              calendarEvents.push(event)
            });
          };
        };
      },
      storeEvent: function(calEvent){
        calendarEvents.push(calEvent)
      }
    }
}]);
//look at events in calendar determine if overlap
//if one does resize the later event with the overlapCount
//increment the overlap event-count
// continue looking for events that overlap