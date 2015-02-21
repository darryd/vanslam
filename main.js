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

// Hides and removes the id attribute.
function remove_by_id(id) {

  e = document.getElementById(id);
  e.removeAttribute(id);
  e.setAttribute('hidden', null);

}

/*----------------------------------------------------------------------------------------------------------------------------------*/

function add_performer_to_second_round() {


  console.log("add 2");

  //var performance = document.getElementById("get_name2").value;
  var performance = document.getElementById("get_name2_select").value;

  console.log (performance);



  var performance2 = performance_new(performance.name, performance);
  global_rounds[2].add_performance(performance2);

  $('#second_round').append(performance_ui_new(performance2));
}

/*----------------------------------------------------------------------------------------------------------------------------------*/

function add_get_name_2(on_change) {

  var div = document.createElement("div");
  div.id = "get_name2";

  div.appendChild(document.createTextNode("Select poet's name:"));

  var s = document.createElement("select");
  s.id = "get_name2_select";
  s.setAttribute('onchange', 'add_performer_to_second_round()');

  var winners = global_rounds[1].get_winners();


  o = document.createElement("option");
  o.value = null;
  o.text = "None";
  s.appendChild(o);


  for (var i=0; i<winners.length; i++) {

    if (global_rounds[2].performances.indexOf(winners[i]) == -1) {

      o = document.createElement("option");
      o.value = winners[i];
      o.text = winners[i].name;

      s.appendChild(o);
      div.appendChild(s);
    }
  }
  $("#second_round").append(div);
}

/*----------------------------------------------------------------------------------------------------------------------------------*/

ready = function() { 

  global_rounds = [];
  global_rounds[0] = round_new(0);
  global_rounds[1] = round_new(5);
  global_rounds[2] = round_new(0);

  add_get_name("sacrifice", "#sacrifice", "get_poets_name('sacrifice', '#sacrifice', 0)");
  add_get_name("first_round", "#first_round", "first_round_get_poets_name('first_round', '#first_round', 1)");

}


/*----------------------------------------------------------------------------------------------------------------------------------*/

$(document).ready(ready);
