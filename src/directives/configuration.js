calendar.factory("config", function(){
  var defaults = {
      hourSlots: 2,
      cellHeight: "22px",
      calendarHeight: "1000px",
    }
  return {
    userOptions: {},
    getOptions: function(){
      return angular.extend(defaults, this.userOptions)
    },
    cellHeightToInt: function(){
      return parseInt(this.getOptions()["cellHeight"].replace("px", ""))
    },
    getHourSlots: function(){
      return this.getOptions()["hourSlots"]
    },
    getCalendarHeight: function(){
      return  this.getOptions()["calendarHeight"]
    }
  }
})