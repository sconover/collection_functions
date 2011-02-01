CollectionFunctions = function(
    __each, __breaker, __nothing, __equals, 
    __newCollection, __newCollectionAppender, __isCollection) {
  
  var cost = __nothing()
    
  function lastCost(){ return cost }
  
  function each(collection, iterator) {
    cost = 0
    var count = 0
    __each(collection, function(item){
      cost += 1
      var result = iterator(item, count)
      count += 1
      return result
    })
  }
  
  function detect(collection, matcher) {
    var hit = __nothing()
    each(collection, function(item, i){
      if (matcher(item, i)) {
        hit = item
        return __breaker
      }
    })
    return hit
  }

  function select(collection, matcher) {
    var newCollection = __newCollection()
    each(collection, function(item, i){
      if (matcher(item, i)) __newCollectionAppender(newCollection, item)
    })
    return newCollection
  }
  
  function map(collection, transformer, newCollectionF, appenderF) {
    newCollectionF = newCollectionF || __newCollection
    appenderF = appenderF || __newCollectionAppender
    
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
          __newCollectionAppender(newCollection, item)
        })
      } else {
        __newCollectionAppender(newCollection, item)
      }
    })
    return newCollection
  }

  function concat() {
    var newCollection = __newCollection()
    var totalCost = 0
    for(var i=0; i<arguments.length; i++) {
      var collection = arguments[i]
      each(collection, function(item){__newCollectionAppender(newCollection, item)})
      totalCost += cost
    }
    cost = totalCost
    return newCollection
  }

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
        if (i>=startPos) __newCollectionAppender(newCollection, item)
        if (i==(startPos+length-1)) return __breaker
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

  function splice(mainCollection, spliceInCollection, insertAtIndex) {
    return concat(slice(mainCollection, [0, insertAtIndex-1]),
                  spliceInCollection, 
                  slice(mainCollection, [insertAtIndex, -1]))
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
    size: size
  }
  
  return {
    functions:functions,
    decorate: function(target){for(k in functions){target[k] = functions[k]}}
  }
}