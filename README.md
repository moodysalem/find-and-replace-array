# find-and-replace
tiny JS module for finding an object in an array and returning a copy of the array with the object replaced

# signature
findAndReplace(Array array, Object object, Function/string matcher);

# example

    var findAndReplace = require('find-and-replace-array');
    // by id is default behavior
    var newArray = findAndReplace([ {id:1, name: 'Moody'} ], {id: 1, name: 'John'})
    // [ {id: 1, name: 'John'} ]
    