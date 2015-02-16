
/*----------------------------------------------------------------------------------------------------------------------------------*/

var num_rounds = 2;
var num_judges = 5;
var time_limit = 3 * 60;
var grace_time = 10;

/*----------------------------------------------------------------------------------------------------------------------------------*/

performance_new = function (name, prev) {

  var performance = {};
  /*--------------------------------------------------------------------------------------------------------------------------------*/
  // Notify that the score has been (re)calculated.

  performance.add_notify_score = function(func, owner) {

    var data = {func: func, owner: owner};
    this.call_backs_score.push(data);
  }

  /*--------------------------------------------------------------------------------------------------------------------------------*/
  // Notify that the rank has been (re)calculated.

  performance.add_notify_rank = function(func, owner) {

    var data = {func: func, owner: owner};
    this.call_backs_rank.push(data);
  }

  /*--------------------------------------------------------------------------------------------------------------------------------*/

  performance.notify_score = function() {

    for (var i=0; i<this.call_backs_score.length; i++) {

      var func = this.call_backs_score[i].func;
      var owner = this.call_backs_score[i].owner;

      func(owner, this);
    }
  }
  /*--------------------------------------------------------------------------------------------------------------------------------*/

  performance.notify_rank = function() {

    for (var i=0; i<this.call_backs_rank.length; i++) {

      var func = this.call_backs_rank[i].func;
      var owner = this.call_backs_rank[i].owner;

      func(owner, this);
    }
  }


  /*--------------------------------------------------------------------------------------------------------------------------------*/

  performance.set_rank= function(rank) {
    this.rank = rank;
    this.notify_rank();
  }


  /*--------------------------------------------------------------------------------------------------------------------------------*/

  performance.set_penalty = function(penalty) {

    this.penalty = penalty;
    this.calculate();
  }

  /*--------------------------------------------------------------------------------------------------------------------------------*/

  performance.set_time = function(min, sec) {

    this.seconds = min * 60 + sec;
    this.calculate();
  }


  /*--------------------------------------------------------------------------------------------------------------------------------*/
  performance.calculate_time_penalty = function() {

    var over_time;
    var penalty;

    if (this.seconds <= time_limit + grace_time)
      return 0;

    over_time = this.seconds - time_limit;
    over_time = Math.floor(over_time / 10);
    penalty = over_time * 0.5;

    return penalty;
  }

  /*--------------------------------------------------------------------------------------------------------------------------------*/
  performance.judge = function (judge_num, score) {

    this.judges[judge_num] = score;
    this.calculate();

  } // 1 = first place, 2, second place, etc...
  /*--------------------------------------------------------------------------------------------------------------------------------*/
  performance.find_min_judge = function() {

    var min_score = Infinity;
    var min_judge;

    for (var i=0; i<num_judges; i++)
      if (min_score > this.judges[i]) {
	min_score = this.judges[i];
	this.min_judge = i;
      }
  }

  /*--------------------------------------------------------------------------------------------------------------------------------*/
  // Precondition: find_min_judge was called before calling this function. This is because if all the judges have the same score
  // The minimum and maximum judges cannot be the same judges.
  performance.find_max_judge = function() {

    var max_score = -Infinity;
    var max_judge;

    for (var i=0; i<num_judges; i++)
      if (max_score < this.judges[i] && i != this.min_judge) {
	max_score = this.judges[i];
	this.max_judge = i;
     }
  }
  /*--------------------------------------------------------------------------------------------------------------------------------*/

  performance.add_up_judges = function() {
    
    var sum = 0;
    
    this.find_min_judge();
    this.find_max_judge();

    for (var i=0; i<num_judges; i++) 
      if (i != this.min_judge && i != this.max_judge)
	sum += this.judges[i];

    return sum;
  }


  /*--------------------------------------------------------------------------------------------------------------------------------*/

  performance.calculate = function(me) {

   if (typeof me === 'undefined')
     me = this;

   me.score = 0;
   me.score += me.add_up_judges(); 
   me.score -= me.penalty;
   me.score -= me.calculate_time_penalty();

   me.cum_score = me.score;
   if (me.prev != null)
     me.cum_score += me.prev.cum_score;


   me.notify_score();
  }

  /*--------------------------------------------------------------------------------------------------------------------------------*/

  performance.name = name;
  performance.prev = prev;

  performance.penalty = 0;
  performance.seconds = 0;

  performance.judges = [];
  for (var i=0; i<num_judges; i++)
    performance.judges[i] = 0;

  performance.score = 0;
  performance.rank = Infinity; // 1 = first place, 2, second place, etc...

  if (prev != null) {
    performance.cum_score = prev.cum_score;
    prev.add_notify_score(performance.calculate, performance);

  }
  else
    performance.cum_score = 0;

  performance.call_backs_score = [];
  performance.call_backs_rank = [];

  return performance;
}


/*----------------------------------------------------------------------------------------------------------------------------------*/
round_new = function (num_places) {

  var round = {};

  round.num_places = num_places;
  round.performances = [];

  round.call_backs = [];
  /*--------------------------------------------------------------------------------------------------------------------------------*/

  round.rank = function(me) {

    if (typeof me === 'undefined')
      me = this;

    var rankings = [];

    for (var i=0; i<me.performances.length; i++)
      if (rankings.indexOf(me.performances[i].score) == -1)
	  rankings.push(me.performances[i].score);

    rankings.sort(function(a, b){return b - a;});

    for (var i=0; i<me.performances.length; i++) {

      var score = me.performances[i].score;
      var ranking = rankings.indexOf(score) + 1;
      me.performances[i].set_rank(ranking);
    }
  }  

  /*-------------------------------------------------------------------------------------------------------------------------------*/

  round.get_winners = function() {

    var winners = [];
    for (var i=0; i<this.performances.length; i++)
      if (this.performances[i].rank <= this.num_places)
	winners.push(this.performances[i]);

    return winners;
  }
  /*-------------------------------------------------------------------------------------------------------------------------------*/

  round.add_performance = function(performance) {
  
    performance.add_notify_score(this.rank, this)  
    this.performances.push(performance);

  }
  /*--------------------------------------------------------------------------------------------------------------------------------*/
  return round;

}

/*----------------------------------------------------------------------------------------------------------------------------------*/
