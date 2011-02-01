CollectionFunctions = function(
    __iterator, __nothing, __equals, 
    __newCollection, __collectionAppender, __isCollection) {
  
  var cost = __nothing()
  var breaker = {}
  
  function lastCost(){ return cost }
  
  function each(collection, callback) {
    cost = 0
    var count = 0
    
    var iteratorInstance = __iterator(collection)
    while (iteratorInstance.hasNext()) {
      var item=iteratorInstance.next()
      cost += 1
      var result = callback(item, count)
      if (result === breaker) break
      count += 1
    }
  }
  
  function detect(collection, matcher) {
    var hit = __nothing()
    each(collection, function(item, i){
      if (matcher(item, i)) {
        hit = item
        return breaker
      }
    })
    return hit
  }

  function select(collection, matcher) {
    var newCollection = __newCollection()
    each(collection, function(item, i){
      if (matcher(item, i)) __collectionAppender(newCollection, item)
    })
    return newCollection
  }
  
  function map(collection, transformer, newCollectionF, appenderF) {
    newCollectionF = newCollectionF || __newCollection
    appenderF = appenderF || __collectionAppender
    
    var newCollection = newCollectionF()
    each(collection, function(item, i){
      appenderF(newCollection, transformer(item, i))
    })
    return newCollection
  }
  

  
  function include(collection, findMe) {
    var index = __nothing()
    detect(collection, function(item, i){
      if (__equals(item, findMe)) {
        index = i
        return true
      }
    })
    return index
  }
  
  function flatten(collection) {
    var newCollection = __newCollection()
    each(collection, function(item){
      if (__isCollection(item)) {
        var itemFlattened = flatten(item)
        each(itemFlattened, function(item) {
          __collectionAppender(newCollection, item)
        })
      } else {
        __collectionAppender(newCollection, item)
      }
    })
    return newCollection
  }

  function concat() {
    var newCollection = __newCollection()
    var totalCost = 0
    for(var i=0; i<arguments.length; i++) {
      var collection = arguments[i]
      each(collection, function(item){__collectionAppender(newCollection, item)})
      totalCost += cost
    }
    cost = totalCost
    return newCollection
  }

  // function zip() {
  //   var zipped = __newCollection()
  //   for(var i=0; i<arguments.length; i++) {
  //     var collection = arguments[i]
  //     each(collection, function(item){
  //       __collectionAppender(newCollection, item)
  //     })
  //   }
  //   return zipped
  // }
  // 
  // function equals(collectionA, collectionB) {
  //   var notEqualEntry = detect(zip(collectionA, collectionB), function(entry, i) {
  //     var itemA = entry[0]
  //     var itemB = entry[1]
  //     if (!__equals(itemA, itemB)) return true
  //   })
  //   return notEqualEntry == __nothing()
  // }

  function size(collection) {
    //efficiency later
    var count = 0
    each(collection, function() { count += 1 })
    return count
  }

  function slice(collection, a, b) {
    function sliceStartPlusLength(collection, startPos, length) {
      var newCollection = __newCollection()
      each(collection, function(item, i) {
        if (i>=startPos) __collectionAppender(newCollection, item)
        if (i==(startPos+length-1)) return breaker
      })
      
      return newCollection
    }
    
    function sliceRange(collection, range) {
      var startPos = range[0]
      var endPos = range[1]
      
      if (startPos>=0 && endPos>=0) {
        return sliceStartPlusLength(collection, startPos, endPos-startPos+1)
      } else {
        var theSize = size(collection)
        var positiveStartPos = startPos<0 ? theSize + startPos : startPos
        var positiveEndPos = endPos<0 ? theSize + endPos : endPos
        return sliceRange(collection, [positiveStartPos, positiveEndPos])
      }
    }
    
    if (typeof a.length != "undefined") {
      var range = a
      return sliceRange(collection, range)
    } else {
      var startPos = a
      var length = b
      return sliceStartPlusLength(collection, startPos, length)
    }
  }

  function splice(mainCollection, spliceInCollection, insertAtIndex, overwriteLength) {
    overwriteLength = overwriteLength || 0
    return concat(slice(mainCollection, [0, insertAtIndex-1]),
                  spliceInCollection, 
                  slice(mainCollection, [insertAtIndex + overwriteLength, -1]))
  }

  function clone(collection) {
    return concat(collection)
  }
  
  function specialCurry(func, collectionFunc) {
    return function() {
      var args = []
      for(key in arguments){args[key] = arguments[key]}

      args.unshift(collectionFunc.apply(this, []))
      return func.apply(null, args)
    }
  }

  var functions = {
    lastCost: lastCost,
    each: each,
    detect: detect,
    select: select,
    map: map,
    include: include,
    flatten: flatten,
    concat: concat,
    slice: slice,
    splice: splice,
    size: size,
    clone: clone
  }
  
  function makeObjectStyleFunctions(collectionGetter) {
    var curried = {}
    for(k in functions){curried[k] = specialCurry(functions[k], collectionGetter)}
    return curried
  }
  
  return {
    functions:functions,
    decorate: function(target){for(k in functions){target[k] = functions[k]}},
    makeObjectStyleFunctions: makeObjectStyleFunctions,
    decorateObjectStyle: function(target, collectionGetter){
      var curriedFunctions = makeObjectStyleFunctions(collectionGetter)
      for(k in curriedFunctions){target[k] = curriedFunctions[k]}
    }
  }
}