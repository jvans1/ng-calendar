cal.event = (function(){
  var eventObject = {};
  var privateScope = {
    scope: null,
    eventCount: 0,
    bindToScope: function(calEvent){
      eval('this.scope.' + this.eventVariable() + '=calEvent') 
      return true
    },
    eventVariable: function(){
      return 'calEvent' + this.eventCount
    },
    eventHeight: function(){
      var hourSlots = cal.configuration.getOptions()["hourSlots"]
      return 20 * hourSlots
    }
  }

  eventObject.setScope = function(scope){
    privateScope.scope = scope
    return scope
  }

  eventObject.configure = function(calEvent){
    privateScope.eventCount ++
    var yOffset = cal.position.dayEventOffset(calEvent.startTime).y
    var style = "height: " + privateScope.eventHeight() + "px; width: 100%;position: absolute;background: yellow;top:" + yOffset + "px ;"
    privateScope.bindToScope(calEvent);
    var eventVariable = privateScope.eventVariable();
    var eventNode = "<cal-event action=\"eventClick({event: event})\"  source=" + eventVariable  + " event-style=\"" + style + "\" ></cal-event>" 
    return eventNode 
  }
  return eventObject
})()