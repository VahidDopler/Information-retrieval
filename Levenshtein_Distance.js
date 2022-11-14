//Levenshtein main function
const prompt = require('prompt-sync')();

const FindMinOfChangeStrings = function (first, second, array) {
  for (let row = 1; row < array.length; row++) {
    for (let column = 1; column < array[row].length; column++) {
      let tempArr = new Array(3);
      tempArr[0] = array[row - 1][column] + 1;
      tempArr[1] = array[row][column - 1] + 1;
      if (first[row - 1] == second[column - 1]) {
        tempArr[2] = array[row - 1][column - 1] + 0;
      } else {
        tempArr[2] = array[row - 1][column - 1] + 1;
      }
      array[row][column] = Math.min(...tempArr);
    }
  }
  console.log('The result is => ', array[second.length][first.length]);
};

//Intilize Array for Levenshtein algorithm
const IntilizeArray = function (first, second) {
  const array = new Array(second.length + 1);
  for (let index = 0; index < array.length; index++) {
    array[index] = new Array(first.length + 1);
  }
  array[0][0] = 0;
  var num1 = 1;
  for (let row = 0; row < first.length; row++) {
    array[0][row + 1] = num1;
    num1++;
  }

  var num2 = 1;
  for (let column = 0; column < second.length; column++) {
    array[column + 1][0] = num2;
    num2++;
  }
  return array;
};

const first = prompt('Enter your first string => ');
const second = prompt('Enter your second string => ');
const array = IntilizeArray(first, second);
FindMinOfChangeStrings(first, second, array);
