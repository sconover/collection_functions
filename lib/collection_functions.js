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

  var functions = {
    lastCost: lastCost,
    each: each,
    detect: detect,
    select: select,
    map: map,
    include: include,
    flatten: flatten
  }
  
  return {
    functions:functions,
    decorate: function(target){for(k in functions){target[k] = functions[k]}}
  }
}