/* randNum(max);
a helper function to return whole number randoms
@param max {int} the max in the random range
@return {int} a random number of 1 or more
*/
function randNum(max) {return Math.floor(Math.random()*max)+1}
/* uniqueIndex(max, number)
a helper function to get unique numbers out of a range so as to avoid reuse.
@param max {int} the max number in the number in the range +1
@param number {int} the number of responses to return
@return {array} an array of the selected number
*/
function uniqueIndex(max, number){
    var array = [];
    var numbers = [];
    array.length = max;
    for(var i = 0; i < number; i++){
        var num = randNum(max);
        if (array[num] !== "") {
        numbers[i] = num;
        }
        else{
        var num = randNum(max);
        i--;
        }
        array[num] = "";
}
return numbers;
}
/* andEval(condition1, condition2)
takes two conditions and makes a new condition out of them based on their combined
and state and combines the text of the two conditions. Cleans up text some
@param condition1 {object} an object with str and bool keys
@param condition2 {object} an object with str and bool keys
@return {object} an object with str and bool keys
*/
function andEval(condition1,condition2){
  var cond1 = condition1.trim();
  var cond2 = condition2.trim();
  return cond1 + " and " + cond2;
}
/* orEval(condition1, condition2)
takes two conditions and makes a new condition out of them based on their combined
or state and combines the text of the two conditions. Cleans up text some
@param condition1 {object} an object with str and bool keys
@param condition2 {object} an object with str and bool keys
@return {object} an object with str and bool keys
*/
function orEval(condition1,condition2){
  var cond1 = condition1.trim();
  var cond2 = condition2.trim();
  return cond1 + " or " + cond2;
}
/* notEval(condition)
takes a condtion, negates it's value, adds the text "it is not the case that" to the
front of it, sets the negated key to true
@param condtion {object} an object with str and bool keys
@return {object} an object with str, bool, and negated keys
*/
function notEval(condition){
  
}
/* makeQuestion(conditions, maxDepth=3, negate=.2)
takes an array of condition objects formated {str: text, bool: bool, negated: bool}
and uses it make a question of depths between 1 - maxDepth combined statement length
@param condition {array} an array of objects formatted as listed above
@param maxDepth {int} number of conditionals to be put together at max
@param negate {float} chance of a negation happening
@return a new object with the same general format
*/
/* makeSentence(condition)
Makes a (likely run-on) sentence out of a conditional stored in an object with the keys str, bool, and negated.
It does the following: if negated then it capitalized the i in "it is not the case" and adds a period to the end of the str.
If it is not negated then it adds the phrase "It is the case " to the start of the str and adds a period to the end of the string.
@param condition {array} an array of objects formatted as listed above
@return {object} a new object with the same general format
*/
function makeSentence(condition) {
  if () {

  }
  else {
    "It is the case " + condition + "."
  }
}
