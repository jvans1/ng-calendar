calendar.factory("eventComparisonService",[ 'time', function(time){
  var firstEvent, lastEvent, event1, event2;
  var eventComparisonObj = {}

  var extendsIntoEvent = function(){
    var event1Top, event1Height, event2Top;
    event1Top = parseInt(event1.scope.style.attributes.top.split("px"))
    event1Height = parseInt(event2.scope.style.attributes.height.split("px"))
    event2Top = parseInt(event2.scope.style.attributes.top.split("px"))
    return ( event1Top + event1Height ) > event2Top
  }

  eventComparisonObj.sameEvent = function(){
      return event1.elemId === event2.elemId
    }
  eventComparisonObj.overlapsFromTop = function(){
      return extendsIntoEvent()
    }

  eventComparisonObj.sharesLeftAncher = function(){
      return event1.scope.leftAlignmentInt() === event2.scope.leftAlignmentInt()
    }

  eventComparisonObj.setEvent1 = function(event) { 
    event1 = event
  }
  eventComparisonObj.setEvent2 = function(event) { 
    event2 = event
  }

  eventComparisonObj.lastEvent =  function (){
    console.log(event1.title)
    console.log(event2.title)
    if (time.minutes(event1.startTime) > time.minutes(event2.startTime)){
      return event1
    }else{
      return event2
    }
  }
  var eventComparisonConstructor = function(event1, event2){
    eventComparisonObj.setEvent1(event1)
    eventComparisonObj.setEvent2(event2)
    return eventComparisonObj
  }
  return eventComparisonConstructor
}])