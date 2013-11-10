cal.configuration = (function(){
  var privateScope = {
    defaults: {
      hourSlots: 2,
      cellHeight: 22, //22px default
      tableHeight: "1000",
    }    
  }
  var configuration = {
    userOptions: {},
    getOptions: function(){
      return angular.extend(privateScope.defaults, this.userOptions)
    }
  };
  return configuration
})()