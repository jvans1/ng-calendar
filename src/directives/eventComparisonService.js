calendar.factory("eventComparisonService",[ 'time', function(time){
  var firstEvent, lastEvent;
  var eventComparisonObj = {}

  var extendsIntoEvent = function(){
    var event1Top, event1Height, event2Top;
    event1Top = parseInt(firstEvent.style.attributes.top.split("px"))
    event1Height = parseInt(lastEvent.style.attributes.height.split("px"))
    event2Top = parseInt(lastEvent.style.attributes.top.split("px"))
    return ( event1Top + event1Height ) > event2Top
  }

  eventComparisonObj.sameEvent = function(){
    return firstEvent.$id === lastEvent.$id
  }
  eventComparisonObj.overlapsFromTop = function(){
      return extendsIntoEvent()
    }

  eventComparisonObj.sharesLeftAncher = function(){
      return firstEvent.leftAlignmentInt() === lastEvent.leftAlignmentInt()
    }

  eventComparisonObj.setEvents = function(event1, event2) { 
    if (time.minutes(event1.startTime) > time.minutes(event2.startTime)){
      firstEvent = event1
      lastEvent = event2
    }else{
      firstEvent = event2
      lastEvent = event1
    }
    return this
  }

  eventComparisonObj.lastEvent =  function (){
    return lastEvent
  }

  var eventComparisonConstructor = function(event1, event2){
    eventComparisonObj.setEvents(event1, event2)
    return eventComparisonObj
  }
  return eventComparisonConstructor
}])