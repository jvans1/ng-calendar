cal.findEventNode = function(id){
  var node = document.body.querySelector("tr[id='" + id + "']")
  return node
}
cal.findTableNode = function(){
  var node = document.body.querySelector("table[id='cal-table']")
  return node
}

cal.findTableContainer = function(){
  var node = document.body.getElementsByClassName("cal-container")[0]
  return node
}