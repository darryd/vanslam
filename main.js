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

  var e = document.getElementById(id);

  if (e != null) {
    e.removeAttribute(id);
    e.setAttribute('hidden', null);
  }
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

function add_performer_to_2nd_round(performance) {


  var performance2 = performance_new(performance.name, performance);
  global_rounds[2].add_performance(performance2);
  $("#second_round").append(performance_ui_new(performance2));

  global_rounds[2]._performances.push(performance)
  show_2nd_round_buttons();
}

/*----------------------------------------------------------------------------------------------------------------------------------*/

// For adding a poet to the second round.
function performance_to_button(performance) {

  var button = document.createElement("button");
  button.text = document.createTextNode(performance.name);

  button.performance = performance;
  button.setAttribute("onClick", "add_performer_to_2nd_round(this.performance)");

  performance.poet.notify_name.add_notify(button_name_update, button);

  button.appendChild(button.text);

  return button;
}

/*----------------------------------------------------------------------------------------------------------------------------------*/

button_name_update = function(button) {

  button.text.nodeValue = button.performance.poet.name;

}


/*----------------------------------------------------------------------------------------------------------------------------------*/

function get_second_round_poet_buttons() {

  var result = global_rounds[1].get_winners();

  var div = document.createElement("div");
  div.id = "second_round_buttons";

  var p = document.createElement("p");
  p.innerHTML = "Select next poet.";
  div.appendChild(p);

  for (var i=0; i<result.winners.length; i++) {

    var performance = result.winners[i];

    if (global_rounds[2]._performances.indexOf(performance) == -1) {
      var button = performance_to_button(result.winners[i]);
      div.appendChild(button);
    }
  }

  if (result.result != 0) {

    var div2 = document.createElement("div");
    var p = document.createTextNode("Overflow! Too many poets tied in " + places[result.result] + " place:");
    div2.appendChild(p);
    for (var i=0; i<result.overflow.length; i++) {

      var performance = result.overflow[i];
      if (global_rounds[2]._performances.indexOf(performance) == -1) {
	var button = performance_to_button(result.overflow[i]);
	div2.appendChild(button);
      }
    }
    div.appendChild(div2);
  }

  return div;
}

/*----------------------------------------------------------------------------------------------------------------------------------*/
show_2nd_round_buttons = function() {

  $("#second_round_buttons").remove();

  var div = get_second_round_poet_buttons();

  $("#second_round").append(div);

}

/*----------------------------------------------------------------------------------------------------------------------------------*/
ready = function() { 

  global_rounds = [];
  global_rounds[0] = round_new(0);
  global_rounds[1] = round_new(5);
  global_rounds[2] = round_new(0);
  global_rounds[2]._performances = [];

  add_get_name("sacrifice", "#sacrifice", "get_poets_name('sacrifice', '#sacrifice', 0)");
  add_get_name("first_round", "#first_round", "first_round_get_poets_name('first_round', '#first_round', 1)");

  global_rounds[1].add_notify_rank(show_2nd_round_buttons);
}


/*----------------------------------------------------------------------------------------------------------------------------------*/

$(document).ready(ready);
