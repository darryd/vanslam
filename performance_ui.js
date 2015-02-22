
/*----------------------------------------------------------------------------------------------------------------------------------*/
function performance_ui_new(performance) {

  var table = document.createElement("table");
  table.tr = document.createElement("tr");
  table.appendChild(table.tr);
  table.border = "1";

  insert_into_table(table, document.createTextNode(performance.name));
  table.tr = document.createElement("tr");
  table.appendChild(table.tr);

  insert_into_table(table, judges_ui_new(performance));
  insert_into_table(table, time_ui_new(performance));
  insert_into_table(table, penalty_ui_new(performance));
  insert_into_table(table, score_ui_new(performance));
  insert_into_table(table, subscore_ui_new(performance));
  insert_into_table(table, cum_score_ui_new(performance));
  insert_into_table(table, rank_ui_new(performance));


  table.tr = document.createElement("tr");
  table.appendChild(table.tr);
  insert_into_table(table, document.createTextNode("Enter scores multiplied by 10."));

  
  var p = document.createElement("p");
  insert_into_table(table, p);
  
  // Another field to show time penalty.
  var data = {p: p, performance: performance};
  performance.add_notify_score(time_penalty_update, data);
  time_penalty_update(data);

  return table;
}


