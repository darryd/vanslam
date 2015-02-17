/*----------------------------------------------------------------------------------------------------------------------------------*/

function get_poets_name(id, add_to, round_i) {

  var e = document.getElementById("get_name" + id);
  e.removeAttribute('id');
  e.setAttribute("hidden", null);

  e = document.getElementById("input_" + id);
  e.removeAttribute('id');

  var performance = performance_new(e.value);
  global_rounds[round_i].add_performance(performance);

  $(add_to).append(performance_ui_new(performance));
}

/*----------------------------------------------------------------------------------------------------------------------------------*/

function first_round_get_poets_name(id, add_to, round_i) {

  get_poets_name(id, add_to, round_i);
  add_get_name("first_round", "#first_round", "first_round_get_poets_name('first_round', '#first_round', 1)");
 
}


/*----------------------------------------------------------------------------------------------------------------------------------*/

function add_get_name(id, add_to, on_change) {

  var div = document.createElement("div");
  div.id = "get_name" + id;

  div.appendChild(document.createTextNode("Enter poet's name:"));
  input = document.createElement("input");
  input.id = "input_" + id;
  input.setAttribute("onchange", on_change);

  div.appendChild(input);

  $(add_to).append(div);
}

/*----------------------------------------------------------------------------------------------------------------------------------*/

ready = function() { 


  global_rounds = [];
  global_rounds[0] = round_new(0);
  global_rounds[1] = round_new(5);
  global_rounds[2] = round_new(0);

  var num_places = 5;

  add_get_name("sacrifice", "#sacrifice", "get_poets_name('sacrifice', '#sacrifice', 0)");

  var round_one = round_new(num_places);

  add_get_name("first_round", "#first_round", "first_round_get_poets_name('first_round', '#first_round', 1)");

}


/*----------------------------------------------------------------------------------------------------------------------------------*/

$(document).ready(ready);
