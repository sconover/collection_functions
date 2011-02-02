CollectionFunctions = (function(){  

  var arrayCFDefinition = {
    iterator:function(collection){
      var position = 0
      return {
        next: function() {
          var result = collection[position]
          position += 1
          return result
        },
        hasNext: function(){return position<collection.length}
      }
    },
    nothing:function(){return null},
    equals:function(a,b){return a == b},
    newCollection:function(){return []},
    append:function(array, item){ array.push(item) },
    isCollection:function(thing){ return typeof thing.length != "undefined" },
    size:function(array){ return array.length }
  }

  var mainFunction = function(userFeatures) {
    
    var factory = (function me(features, arrayFunctions, createAcrossCF) {
      
      var createAcrossCF = createAcrossCF==false ? false : true
      var cost = 0
      var currentCosts = []
      var breaker = {}

      function lastCost(){ 
        var was = cost
        cost = 0
        return was 
      }

      function newIterator(collection) {
        return features.iterator(collection)
      }
      
      function pushCost() {
        var myCostPosition = currentCosts.length
        currentCosts.push(0)
        return myCostPosition
      }

      function popAndAddCost(myCostPosition) {
        if (myCostPosition==0) {
          cost = currentCosts.pop()
        } else {
          var myCost = currentCosts.pop()
          currentCosts[myCostPosition-1] += myCost
        }
      }

      function each(collection, callback) {
        var myCostPosition = pushCost()
        
        var count = 0
  
        var iteratorInstance = newIterator(collection)
        while (iteratorInstance.hasNext()) {
          var item=iteratorInstance.next()
          currentCosts[myCostPosition] += 1
          var result = callback(item, count)
          if (result === breaker) break
          count += 1
        }
        
        popAndAddCost(myCostPosition)
      }

      function detect(collection, matcher) {
        var hit = features.nothing()
        each(collection, function(item, i){
          if (matcher(item, i)) {
            hit = item
            return breaker
          }
        })
        return hit
      }

      function select(collection, matcher) {
        var newCollection = features.newCollection()
        each(collection, function(item, i){
          if (matcher(item, i)) features.append(newCollection, item)
        })
        return newCollection
      }

      function map(collection, transformer, newCollectionF, appenderF) {
        newCollectionF = newCollectionF || function(){return []}
        appenderF = appenderF  || function(arr, item){arr.push(item)}
  
        var newCollection = newCollectionF()
        each(collection, function(item, i){
          appenderF(newCollection, transformer(item, i))
        })
        return newCollection
      }
      
      function pluck(collection, property) {
        return map(collection, function(item){
          var value = item[property]
          if (typeof value == "function") {
            value = value()
          }
          return value
        })
      }

      function indexOf(collection, findMe) {
        var index = features.nothing()
        detect(collection, function(item, i){
          if (features.equals(item, findMe)) {
            index = i
            return true
          }
        })
        return index
      }
      
      function include(collection, findMe) {
        return indexOf(collection, findMe) != features.nothing()
      }
      
      function uniq(collection) {
        var newCollection = features.newCollection()
        each(collection, function(item){
          if (!include(newCollection, item)) features.append(newCollection, item)
        })
        return newCollection
      }

      function intersect(collectionA, collectionB) {
        var result = select(collectionA, function(itemA) {
          return include(collectionB, itemA)
        })
        var totalCost = cost
        result = uniq(result)
        totalCost += cost
        cost = totalCost
        return result
      }

      function differ(collectionA, collectionB) {
        var result = select(collectionA, function(itemA) {
          return !include(collectionB, itemA)
        })
        var totalCost = cost
        result = uniq(result)
        totalCost += cost
        cost = totalCost
        return result
      }
      
      function without(collection, dontWantThisItem) {
        return select(collection, function(item) {
          return !features.equals(item, dontWantThisItem)
        })
      }
      
      function remove(collection, indexWeDontWant) {
        var newCollection = features.newCollection()
        each(collection, function(item,i) {
          if (i!=indexWeDontWant) features.append(newCollection, item)
        })
        return newCollection
      }

      function flatten(collection) {
        var newCollection = features.newCollection()
        each(collection, function(item){
          if (features.isCollection(item)) {
            var itemFlattened = flatten(item)
            each(itemFlattened, function(item) {
              features.append(newCollection, item)
            })
          } else {
            features.append(newCollection, item)
          }
        })
        return newCollection
      }

      function concat() {
        var newCollection = features.newCollection()
        arrayFunctions.each(arguments, function(collection){
          each(collection, function(item){features.append(newCollection, item)})
        })
        return newCollection
      }


      /*
      Hey look my head is hurting too.  But this is worth it, I think! (?)
      We're expressing multi-collection capability through CF itself,
      meaning you get multi-collection detect, map, etc for free.  Yay!
      */
      var acrossCF = arrayFunctions && createAcrossCF ?
        me({iterator:function(collections){
                      var iteratorInstances = arrayFunctions.map(collections, function(collection){return newIterator(collection)})
  
                      return {
                        next: function() {
                          return arrayFunctions.map(iteratorInstances, function(iterator){
                            return iterator.hasNext() ? iterator.next() : features.nothing()
                          }, features.newCollection, features.append)
                        },
                        hasNext: function(){
                          return arrayFunctions.detect(iteratorInstances, function(iterator){return iterator.hasNext()})
                        }
                      }
                    },
            equals:function(collectionA, collectionB){return equals(collectionA, collectionB)},
            nothing:features.nothing,
            newCollection:features.newCollection,
            append:features.append,
            isCollection:undefined, //doesn't make sense when dealing with multiple collections
          },
          arrayFunctions,
          false //to stop recursion
        ) :
        function(){throw "across not supported in this context"}
  
      function across() {
        var collections = arguments
        return acrossCF.makeObjectStyleFunctions(function(){return collections})
      }
  
      function zip() {
        var lastArgument = arguments[arguments.length-1]
    
        if (typeof lastArgument == "function") {
          var collections = arrayFunctions.slice(arguments, [0,-2])
          var callback = lastArgument
      
          across.apply(null, collections).each(function(entryCollection, i){
            callback.apply(null, arrayFunctions.map(entryCollection, function(item){return item}).concat([i]) )
          })
        } else {
          var collections = arguments
          return across.apply(null, collections).all()
        }
      }
  
      function equals(collectionA, collectionB) {
        var acrossAB = across(collectionA, collectionB)
        var foundNotEqual = acrossAB.detect(function(pairCollection){
          var iter = features.iterator(pairCollection)
          var a = iter.next()
          var b = iter.next()
          return !features.equals(a, b)
        })
        cost = acrossAB.lastCost()
        return !foundNotEqual
      }
      
      var size = features.size || function(collection) {
                                    var count = 0
                                    each(collection, function() { count += 1 })
                                    return count          
                                  }

      function slice(collection, a, b) {
        function sliceStartPlusLength(collection, startPos, length) {
          var newCollection = features.newCollection()
          each(collection, function(item, i) {
            if (i>=startPos) features.append(newCollection, item)
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
      
      function inspect(collection) {
        var strings = []
        each(collection, function(item){ 
          strings.push(typeof item.inspect == "function" ? item.inspect() : "" + item)
        })
        return strings.join(",")
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
        all:concat,
        clone:concat, concat:concat,
        detect:detect, differ:differ,
        each:each, equals:equals,
        flatten:flatten,
        include:include, indexOf:indexOf, inspect:inspect, intersect:intersect,
        lastCost:lastCost,
        map:map,
        newIterator:newIterator,
        pluck:pluck,
        remove:remove,
        select:select, size:size, slice:slice, splice:splice,
        uniq:uniq,
        without:without
      }
  
      if (createAcrossCF) { //can't do across across because we would all die
        functions.across = across
        functions.zip = zip
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
    }) //end factory
    
    
    var arrayCF = factory.apply(null, [arrayCFDefinition])

    var f = factory(userFeatures, arrayCF.functions)
    f.appendFeatures = function(newFeatures) {
      var combined = {}
      for(var k in userFeatures) {combined[k] = userFeatures[k]}
      for(var k in newFeatures) {combined[k] = newFeatures[k]}
      return factory(combined, arrayCF.functions)
    }
    return f
  }
  
  mainFunction.Array = mainFunction.apply(null, [arrayCFDefinition]) //convenience

  return mainFunction
})()