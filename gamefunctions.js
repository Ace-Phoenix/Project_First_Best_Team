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
  var retObj = {};
  retObj.str = condition1.str + " and " + condition2.str;
  retObj.negated = condition1.negated;
  retObj.bool = condition1.bool && condition2.bool;
  return retObj;
}
/* orEval(condition1, condition2)
takes two conditions and makes a new condition out of them based on their combined
or state and combines the text of the two conditions. Cleans up text some
@param condition1 {object} an object with str and bool keys
@param condition2 {object} an object with str and bool keys
@return {object} an object with str and bool keys
*/
function orEval(condition1,condition2){
  var retObj = {};
  retObj.str = condition1.str + " or " + condition2.str;
  retObj.negated = condition1.negated;
  retObj.bool = condition1.bool || condition2.bool;
  return retObj;
}
/* notEval(condition)
takes a condition, negates it's value, adds the text "it is not the case that" to the
front of it, sets the negated key to true
@param condtion {object} an object with str and bool keys
@return {object} an object with str, bool, and negated keys
*/
function notEval(condition){
  return {str: "It is not the case that " + condition.str, bool: !condition.bool, negated: !condition.negated};
}
/* makeQuestion(conditions, maxDepth=3, negate=.2)
takes an array of condition objects formated {str: text, bool: bool, negated: bool}
and uses it make a question of depths between 1 - maxDepth combined statement length
@param condition {array} an array of objects formatted as listed above
@param maxDepth {int} number of conditionals to be put together at max
@param negate {float} chance of a negation happening
@return a new object with the same general format

1.make a return obj
2.find the actual depth
  If depth is 1 ... pick one thing at rendom off condition ... check if we negate, returns
  Otherwise - 1. pick our things - uniqueIndex(condtions.length, depth)
              2. start doing the big return
                1. make a for loop (things.length -1)
                2. in the for loop, want to determine if we use and/or
                [42, 11, 27, 32, 0]
                  0,  1,  2,  3, 4
                we need 2 things, but we make a for loop we get 1 thing =/
                if we use i for itterator we could overcome this in 1 of 3 ways
                way #1 i & i+1  make our loop using length -2 rather than -1
                way #2 i & i-1  we could set i to 1 initally or if i = 0 continue
                  Why are ways 1 & 2 kind of bad
                  First step is to pick first 2
                    ex 42, 11
                  The second set and there on
                   ex 11, 27
                  So if we were to fix that, we need to come up with some way to skip a sequence
                  If we do that, when all is said and done, we still have to add all the sets together.
                    ex {42, 11} {27, 32}
                  We would have to create a way of dealing with having an uneven number of things

                way #3 for i in length of things pop off the end we will have to treat the first one different as with way 2 above
                  way #3 when we have the first thing check if it is negated
                  make the retObj = to the first thing
                  following the first thing figure oyt and or or and negation
                  retObj = which ever eval(new item, retObj)
              3.return retObj;
*/
function makeQuestion(conditions, maxDepth=randNum(3), negate=.2){
    var neg = "neg";
    var or = "or";
    var and = "and";
    var array = [neg,and,and,or,or];
    var condiArray = [];
    for(var i = 0; i < maxDepth; i++){
        var randNeg = array[Math.floor(Math.random()*array.length)];
        var condi = conditions[Math.floor(Math.random()*conditions.length)];
        var condi2 = conditions[Math.floor(Math.random()*conditions.length)];
        if (randNeg == neg) {
            condiArray[i] = notEval(condi);
        }
        condi = conditions[Math.floor(Math.random()*conditions.length)];
        condi2 = conditions[Math.floor(Math.random()*conditions.length)];
        if (randNeg == and) {
            condiArray[i] = andEval(condi,condi2);
    }
        condi = conditions[Math.floor(Math.random()*conditions.length)];
        condi2 = conditions[Math.floor(Math.random()*conditions.length)];
        if (randNeg == or) {
            condiArray[i] = orEval(condi,condi2);
    }
    }
        var negatedd = false;
        var strCondi = "";
        var bools = [""];
    for (var j = 0; j < maxDepth; j++) {
 strCondi += condiArray[j].str + " ";
 if (j===0 && condiArray.length == 1) {
bools[0] = condiArray[j];
}
 if (j === 0 && condiArray.length >= 2) {
   bools[0] = condiArray[j].bool && condiArray[j+1].bool;
}
if (j < maxDepth.length && j !== 0|| j!== 1) {
  bools[0] = bools[0] && condiArray[j].bool;
}
if (j == maxDepth.length) {
bools[0] = bools[0] && condiArray[j];
}
      if (condiArray[j].negated === true) {
        negatedd = true;
}
}
          return {str:strCondi, negated:negatedd, bool:bools[0]};
}
/* makeSentence(condition)
Makes a (likely run-on) sentence out of a conditional stored in an object with the keys str, bool, and negated.
It does the following: if negated then it capitalized the i in "it is not the case" and adds a period to the end of the str.
If it is not negated then it adds the phrase "It is the case " to the start of the str and adds a period to the end of the string.
@param condition {array} an array of objects formatted as listed above
@return {object} a new object with the same general format
*/
function makeSentence(condition) {
  if (condition.negated) {
    condition.str = "I" + condition.str.slice(1) + ".";
  }
  else {
    condition.str = "It is the case " + condition.str + ".";
  }
  return condition;
}
