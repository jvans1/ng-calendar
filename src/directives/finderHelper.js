cal.findEventNode = function(id){
  var node = document.body.querySelector("tr[id='" + id + "']").querySelector("td")
  return angular.element(node)
}
