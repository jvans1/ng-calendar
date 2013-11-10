cal.event = (function(){
  var eventObject = {};
  var privateMembers = {
    scope: null,
    eventCount: 0,
    bindToScope: function(calEvent){
      var variable = 'calEvent' + this.eventCount
      eval('this.scope.' + variable + '=calEvent') 
      return variable
    },
    eventHeight: function(){
      var cellHeight = cal.configuration.getOptions()["cellHeight"]
      var hourSlots = cal.configuration.getOptions()["hourSlots"]
      return cellHeight * hourSlots
    }
  }

  eventObject.setScope = function(scope){
    privateMembers.scope = scope
    return scope
  }

  eventObject.configure = function(calEvent){
    privateMembers.eventCount ++
    var offset = cal.position.computeDayEventOffset(calEvent.startTime)
    var style = "height: " + privateMembers.eventHeight() + "px; width: 100%;position: absolute;background: yellow;top:" + offset.y  + "px ;"
    var variable = privateMembers.bindToScope(calEvent);
    var eventNode = "<cal-event action=\"eventClick({event: event})\"  source=" + variable  + " event-style=\"" + style + "\" ></cal-event>" 
    return eventNode 
  }
  return eventObject
})()