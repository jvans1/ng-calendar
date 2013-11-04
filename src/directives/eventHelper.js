cal.event = (function(){
  var eventObject = {};
  var privateMembers = {
    scope: null,
    eventCount: 0,
    createUniqEventVariable: function(calEvent){
      var variable = 'calEvent' + this.eventCount
      eval('this.scope.' + variable + '=calEvent') 
      return variable
    },
  }

  eventObject.setScope = function(scope){
    privateMembers.scope = scope
    return scope
  }

  eventObject.addToPage = function(calEvent){
    privateMembers.eventCount ++
    var offset = cal.position.computeDayEventOffset(calEvent.startTime)
    var style = ""// "height: 70px;width: 100%;position: absolute;background: red;top: 10px;left: 10px;"
    // var stlye += "top:"
    var variable = privateMembers.createUniqEventVariable(calEvent);
      var table = angular.element(document);
      var modifiedEl = table.append("<cal-event action=\"eventClick({event: event})\"  source=" + variable  + " style: " + style + " ></cal-event>")
    return modifiedEl
  }
  return eventObject
})()