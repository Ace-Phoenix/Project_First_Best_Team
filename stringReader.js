/* stringParser(string)
uses regex to find the end of each line cleans them and makes them an array
students check https://beckism.com/2010/09/splitting-lines-javascript/ for regex
you also want it clean off any lagging carage returns from the end of the line
@param string: {string} a big old string to be read
@return {array} the contents of the string an array, 1 line per array index;
*/
function stringParser(string) {
  var lines = string.match(/^.*((\r\n|\n|\r)|$)/gm);
  for (var i = 0; i < lines.length; i++) {
    if (i <= lines.length) {
    lines[i] = lines[i].slice(0, lines[i].length-1);
}
else{
 continue;
}
  }
  return lines;
}
/* arrayReader(array, split)
take an array of strings in the format of text 1 split text 2
cleans up any extra whitespace
turns this into an object of form {str: text1, bool: bool based on text 2}
text 2 is assumed to be the words true or false. Uses these to set bools
makes a new array where each element is an object.
@param array: {array} an array with string containing the split
@param split: {string} the item to split at
@return {array} an array of objects keyed with str and bool and negated : false
*/
function arrayReader(array, split) {
  var retArr = [];
  for (var i = 0; i < array.length; i++) {
    var obj = {};//<-Obj is {}
    var line = array[i].split(split);//splits array when you have it split
    obj.str = line[0].trim();//.trim removes white whitespace
    obj.negated = false;
    if (line[1].trim() === "true") {
      obj.bool = true;
    }
    else {
      obj.bool = false;
    }
    retArr.push(obj);
  }
  return retArr;
}
/* stringReader(string, split=";")
a wrapper function for stringParser and arrayReader
@param string {string} a heaping long string covering many lines
@pram split=";" {string} where to split the string
@return {array} an array of objects keyed str and bool
*/
function stringReader(string, split = ";") {
  var stringPars = stringParser(string);
  return arrayReader(stringPars, split)
}
