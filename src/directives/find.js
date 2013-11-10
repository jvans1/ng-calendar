cal.findTableNode = function(){
  var node = document.body.querySelector("table[class='cal-table']")
  return node
}

cal.findEventContainer = function(){
  var node = document.body.getElementsByClassName("events-container")[0]
  return node
}

cal.eventsInNode = function(className) { 
  return document.body.getElementsByClassName(className)
}

cal.findDivById = function(id){
 var node = document.body.querySelector("div[id=\"" + id + "\"]") 
 return node
}