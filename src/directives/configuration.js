cal.configuration = (function(){
  var privateScope = {
    defaults: {
      hourSlots: 2,
      cellHeight: "22px",
      calendarHeight: "1000px",
    }    
  }
  var configuration = {
    userOptions: {},
    getOptions: function(){
      return angular.extend(privateScope.defaults, this.userOptions)
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
  };
  return configuration
})()