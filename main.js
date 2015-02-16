/*----------------------------------------------------------------------------------------------------------------------------------*/

function get_poets_name() {

  var e = document.getElementById("sacrifice_get_name");
  e.setAttribute("hidden", null);

  e = document.getElementById("input_sacrifice_get_name");

  $("#sacrifice").append(performance_ui_new(performance_new(e.value, null)));
}

/*----------------------------------------------------------------------------------------------------------------------------------*/

function add_get_name(id, add_to, on_change) {

  var div = document.createElement("div");
  div.id = id;

  div.appendChild(document.createTextNode("Enter poet's name:"));
  input = document.createElement("input");
  input.id = "input_" + id;
  input.setAttribute("onchange", on_change);

  div.appendChild(input);

  $(add_to).append(div);
}

/*----------------------------------------------------------------------------------------------------------------------------------*/

ready = function() {
   
  add_get_name("sacrifice_get_name", "#sacrifice", "get_poets_name()");

}

$(document).ready(ready);
