cal.findEventNode = function(id){
  try{
    var node = document.body.querySelector("tr[id='" + id + "']")
    alert(id)
    alert(node)
    return node
  }catch(e){
    return null
  }
}
cal.findTableNode = function(){
  var node = document.body.querySelector("table[id='cal-table']")
  return node
}
