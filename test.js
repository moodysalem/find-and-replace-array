var findAndReplace = require('./index'),
  assert = require('assert');

describe('findAndReplace', function () {

  it('is a function', function () {
    assert(typeof findAndReplace === 'function');
  });

  it('always returns an array', function () {
    assert(Array.isArray(findAndReplace(null)));
    assert(Array.isArray(findAndReplace(undefined)));
    assert(Array.isArray(findAndReplace([])));
  });

  it('does not return the same array', function () {
    var array = [{id: 1, name: 'hello'}],
      newArray = findAndReplace(array);
    assert(newArray !== array && newArray.length == 1 && newArray[0] === array[0]);
  });

  it('uses the id for a default matcher function', function () {
    var array = [{id: 1, name: 'test'}];

    var noReplace = findAndReplace(array, {id: 2, name: 'test2'});
    assert(noReplace.length == 1 && noReplace[0] === array[0]);

    var toReplace = {id: 1, name: 'hello world'};
    var doReplace = findAndReplace(array, toReplace);
    assert(noReplace.length == 1 && doReplace[0] === toReplace);
  });

  it('accepts a function matcher', function () {
    var matcher = function (one, two) {
        return one['hello'] = two['hello'];
      },
      array = [{id: 0, hello: 'green'}, {id: 1, hello: 'abc'}],
      result = findAndReplace(array, {hello: 'abc', id: 2}, matcher);

    assert(result !== array && result.length == 2 && result[1].id == 2);
  });
});
