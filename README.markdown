CollectionFunctions is a javascript library that provides classic collection manipulation functionality (each, select, map, etc).

I'm a fan of underscore.js [LINK] but I found I needed collection functions that didn't make strong assumptions about the underlying storage format (underscore assumes Arrays).

CollectionFunctions.Array is an Array-backed instance of the functions, which can be used very much like underscore

    //aside: http://aresemicolonsnecessaryinjavascript.com
    
    var _A = CollectionFunctions.Array.functions
    
    _A.each([7,8,9], function(item){console.log(item)})
      => 7
      => 8
      => 9
      
    _A.map(["world", "goodbye"], function(item){return "hello, " + item})
      => ["hello, world", "hello, goodbye"]
    
    _A.include([7,8,9], 8) 
      => true

...and so on.

Array-backed CollectionFunctions are just the start.  You can create your own instances of CollectionFunctions backed by whatever you want, CollectionFunctions simply requires that you provide implementations of "features" so the functions can do their work.  Features include creating new collections, appending to a collection, defining equality between members, etc.

Look at the top of collection_functions.js and you'll see the feature implementations for Array.  A sampling:

    equals:function(a,b){return a == b},
    newCollection:function(){return []},
    append:function(array, item){ array.push(item) },
    ...etc

CollectionFunctions instances are immediately usable in a "functional"-style, e.g.

    _A.map(collection, transformerFunction)

However convenience functions allow you to decorate these on to objects, currying the functions such that the first parameter is supplied automatically:

    var holderOfThings = {array:[]}
    
    CollectionFunctions({
      iterator:function(hoT) {return CollectionFunctions.Array.functions.iterator(hoT.array)}, 
      nothing:function(){return null}, 
      newCollection:function(){return {array:[]}},
      append:function(hoT, item){hoT.array.push(item)}
    }).decorateObjectStyle(holderOfThings, function(){return this})
    
    holderOfThings.array.push("world")
    holderOfThings.array.push("goodbye")
    
    holderOfThings.map(function(item){return "hello, " + item})
      => ["hello, world", "hello, goodbye"]



CollectionFunctions provides more functions and better performance as you supply it with more features.  The upshot is that you can get a lot of interesting functionality by providing just a few basic features.

Providing "iterator" and "nothing" gets you .iterator, .get, .each, .detect, and .size.  Then "newCollection" and "append" get you .map, .select, .pluck, .toCollection, and many others.  You get an inefficient implementation of .size if you only provide "iterator" - it iterates through each member of the collection and counts them up - but you can provide your own "size" feature, which CollectionFunctions will prefer.

Details of what features enable what functions are in the source code: [LINK]