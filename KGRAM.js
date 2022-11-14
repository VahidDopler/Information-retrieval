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
  const readfingFile = await ReadingFile(`${__dirname}/large_dictionary.json`);
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


const makeUnionArra = function (arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
};

const FindCommonWords = function (jaccard , KGramsOfString , MyIndexedMap) {
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
    if (jaccard_index_of_String >= jaccard) console.log(key);
  }
};

const IndexingWords = async (str , jaccard) => {
  const args = await readFileFunction();
  const KGramsOfString = makeMapOfSubString(str);
  const MyIndexedMap = new Map();
  for (let index = 0; index < args.length; index++) {
    try {
      let newMapElement = makeMapOfSubString(
        args[index].replace("'s", '').trim()
      );
      MyIndexedMap.set(
        newMapElement.keys().next().value,
        newMapElement.values().next().value
      );
    } catch (error) {}
  }
  FindCommonWords(jaccard , KGramsOfString , MyIndexedMap)
};

const str_input = prompt("Enter your String => ");
const jaccard = prompt("Enter your jaccard => ")


IndexingWords(str_input , jaccard);
