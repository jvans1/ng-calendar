cal.position = (function(){
  var positionObject = {};
  var privateScope = {
    nodeId: undefined,
    times: [],
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
    },
    setNodeId: function(time){
      var normalizeTime = privateScope.normalizeTime(time)
      this.nodeId = "hour" + normalizeTime
      return this.nodeId
    },
    overLappingEvents: function(){

    },

    xOffset: function(){
      var events = cal.eventsInNode(this.nodeId)

      return "123"
    }
  };


//This feels wrong, it relies on dayEventOffset having been called first which is an
//assumption that doens' tfeel  right
  positionObject.getNodeId = function(){
    return privateScope.nodeId
  }

  positionObject.dayEventOffset = function(event){
    var time = event.startTime
    privateScope.setNodeId(time);
    var eventContainingNode = cal.findDivById(privateScope.nodeId)
    var table = cal.findTableNode();
    var tableOffset = table.getBoundingClientRect();
    var rectangle = eventContainingNode.getBoundingClientRect();
    return { left: privateScope.xOffset(), top: rectangle.top - tableOffset.top }
  }
  return positionObject
})();