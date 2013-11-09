cal.position = (function(){
  var positionObject = {};
  var privateMembers = {
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
  };

  positionObject.computeDayEventOffset = function(time){
    var normalizeTime = privateMembers.normalizeTime(time)
    var id = "hour" + normalizeTime
    var el = cal.findEventNode(id)
    var table = cal.findTableNode();
    var tableOffset = table.getBoundingClientRect();
    var rectangle = el.getBoundingClientRect();
    return { x: rectangle.left, y: rectangle.top - tableOffset.top }
  }
  return positionObject
})();