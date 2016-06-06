var findAndReplace = require('./index'),
  assert = require('assert'),
  isArray = Array.isArray;

describe('findAndReplace', function () {
  var array = [{id: 1, name: 'hello', both: 'a'}, {id: 2, name: 'world', both: 'a'}];

  it('is a function', function () {
    assert(typeof findAndReplace === 'function');
  });

  it('always returns an array', function () {
    assert(isArray(findAndReplace(null)));
    assert(isArray(findAndReplace(undefined)));
    assert(isArray(findAndReplace([])));
    assert(isArray(findAndReplace(array)));
  });

  it('does not return the same array', function () {
    var newArray = findAndReplace(array);
    assert(newArray !== array && newArray.length == 2 && newArray[0] === array[0] && newArray[1] === array[1]);
  });

  it('uses the id for a default matcher function', function () {
    var noReplace = findAndReplace(array, {id: 3, name: 'john'});
    assert(noReplace.length == 2 && noReplace[0] === array[0] && noReplace[1] === array[1]);

    var toReplace = {id: 2, name: 'john'},
      doReplace = findAndReplace(array, toReplace);
    assert(noReplace.length == 2 && doReplace[0] === array[0] && doReplace[1] === toReplace);
  });

  it('accepts a string matcher', function () {
    var toReplace = {id: 3, name: 'hello'};
    var newArray = findAndReplace(array, toReplace, 'name');

    assert(newArray.length === 2 && newArray[0] === toReplace && newArray[1] === array[1]);
  });

  it('replaces all instances of matches', function () {
    var toReplace = {both: 'a', id: 3, name: 'both'};
    var newArray = findAndReplace(array, toReplace, 'both');
    assert(newArray.length === 2 && newArray[0] === toReplace && newArray[1] === toReplace);
  });

  it('accepts a function matcher', function () {
    var matcher = function (one, two) {
        return one['name'] === two['name'] && one['both'] === two['both'];
      },
      toReplace = {name: 'hello', both: 'a', id: 3},
      result = findAndReplace(array, toReplace, matcher);

    assert(result !== array && result.length == 2 && result[0] === toReplace && result[1] === array[1]);
  });
});
