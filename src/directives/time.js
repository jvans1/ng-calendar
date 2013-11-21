calendar.factory("time",[ 'config', function(config){
  var split, hours, minutes, timeString;

  return {
    minutes: function(timeString){
      timeString = timeString || ""
      split = timeString.split(":")
      hours = parseInt(split[0])
      minutes = parseInt(split[1])
      return hours * 60 + minutes
    },
    pixelsPerMinute: function(){
      return parseFloat(config.cellHeightToInt() * config.getHourSlots()) / 60.0
    }
  }
}]);