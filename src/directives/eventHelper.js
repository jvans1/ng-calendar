cal.event = (function(){
  var eventObject = {};
  var privateMethods = {
    scope: null,
    eventCount: 0,
    times: [],    
    createUniqEventVariable: function(calEvent){
      var variable = 'calEvent' + this.eventCount
      eval('this.scope.' + variable + '=calEvent') 
      return variable
    },
    roundMinutes: function(minutes){
      var roundedTime = this.times[0]
      for(var index = 0; index < this.times.length; index ++){
        if (minutes >= this.times[index]) {
          roundedTime = this.times[index + 1]
        }else{
          break
        }
      }
      return roundedTime
    },
    normalizeTime: function(time){
      var timeArray = time.split(":");
      var hour = timeArray.shift();
      var minutes = this.roundMinutes(timeArray.shift());
      if (hour !== undefined && minutes !== undefined) {
        return hour + minutes
      }else if(hour !== undefined && minutes === undefined){
        return hour + "00"
      }else{
        return "0000"
      }
    }
  }

  eventObject.setScope = function(scope){
    privateMethods.scope = scope
    return true
  }

  eventObject.addToPage = function(calEvent){
    privateMethods.eventCount ++
    var normalizedTime = privateMethods.normalizeTime(calEvent.startTime)
    var id = "hour" + normalizedTime
    var style = cal.computePositioning(normalizedTime)
    var el = cal.findEventNode(id)
    var variable = privateMethods.createUniqEventVariable(calEvent)
    var modifiedEl = el.append("<cal-event action=\"eventClick({event: event})\"  source=" + variable  + " ></cal-event>")
    return modifiedEl
  }
  return eventObject
})()
