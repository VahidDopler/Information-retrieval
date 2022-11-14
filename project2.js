const _ = require('underscore');
const fs = require('fs');
const prompt = require('prompt-sync')();

//Function to return promise of reading File
async function ReadingFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

//Find findCommonElements of Arrays
function findCommonElements(inArrays) {
  // check for valid input
  if (typeof inArrays === 'undefined') return undefined;
  if (typeof inArrays[0] === 'undefined') return undefined;

  return _.intersection.apply(this, inArrays);
}

//Get promise of reading File
const readFileFunction = async () => {
  const readfingFile = await ReadingFile(`${__dirname}/small_dictionary.json`);
  const result = await JSON.parse(readfingFile);
  return result.words;
};

const makeMapOfSubString = function (args) {
  const StringMap = new Map();
  const KgramTempArray = [];
  const str = `$${args}$`;
  for (let index = 0; index < str.length - 1; index++) {
    KgramTempArray.push(`${str[index]}${str[index + 1]}`);
  }
  return StringMap.set(args, KgramTempArray);
};

//get Dictionary of reading File

const makeUnionArra = function (arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
};

const FindCommonWords = function() {
  
}

const IndexingWords = async (str) => {
  const args = await readFileFunction();
  const KGramsOfString = makeMapOfSubString(str);
  const MyIndexedMap = new Map();
  for (let index = 0; index < args.length; index++) {
    try {
      let newMapElement = makeMapOfSubString(args[index].replace("'s", '').trim());
    MyIndexedMap.set(
      newMapElement.keys().next().value,
      newMapElement.values().next().value
    );
    } catch (error) {
    }
  }
  for (let [key, valueOfMap] of MyIndexedMap) {
    const UnionArray = makeUnionArra([
      ...valueOfMap,
      ...KGramsOfString.values().next().value,
    ]);
    const setObjectOfStrings = findCommonElements([
      valueOfMap,
      [...KGramsOfString.values().next().value],
    ]);
    const jaccard_index_of_String = Number(
      (setObjectOfStrings.length / UnionArray.length).toFixed(2)
    );
    if (jaccard_index_of_String >= 0.8) console.log(key);
  }
};

//Levenshtein main function
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

//Main function for Levenshtein algorithm
const Levenshtein_Distance = function () {
  const first = prompt('Enter your first string => ');
  const second = prompt('Enter your second string => ');
  const array = IntilizeArray(first, second);
  FindMinOfChangeStrings(first, second, array);
};

//Start of Levenshtein function
// Levenshtein_Distance();

//
FindCommonWords('bana');
