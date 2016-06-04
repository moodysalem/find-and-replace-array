'use strict';

/**
 * Get a function with signature boolean (objectOne, objectTwo) used to find the object to replace in the array
 * @param matcher the matcher parameter passed in to findAndReplace
 * @returns {Function} used to find the matching object
 */
var getMatcher = function (matcher) {
  var matcherType = typeof matcher;

  if (matcherType === 'string') {
    return function (objectOne, objectTwo) {
      return objectOne[matcher] === objectTwo[matcher];
    };
  } else if (matcherType === 'function') {
    return function (objectOne, objectTwo) {
      return matcher(objectOne, objectTwo);
    };
  } else {
    return function () {
      return false;
    };
  }
};

/**
 * This is the
 * @param array to find matches in
 * @param object to replace matches with
 * @param matcher (optional) string key of object to match on, or function to compare two objects - defaults to id
 * @returns {Array} resulting copy of array from finding an object that matches and replacing it
 */
module.exports = function (array, object, matcher) {
  // always return an array
  if (!array || !Array.isArray(array) || array.length === 0) {
    return [];
  }

  if (typeof object !== 'object') {
    // just return a copy of the array
    return [].concat(array);
  }

  if (typeof matcher === 'undefined' || matcher === null) {
    matcher = 'id';
  }

  var toReturn = [],
    matcherFunction = getMatcher(matcher);

  for (var i = 0; i < array.length; i++) {
    var atIndex = array[i];

    if (matcherFunction(atIndex, object)) {
      toReturn.push(object);
    } else {
      toReturn.push(atIndex);
    }
  }

  return toReturn;
};