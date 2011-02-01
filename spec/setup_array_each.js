arrayEachCf = function() {  
  var breaker = "BREAK"
  var arrayEach = function(collection, iterator){
    for(var i=0; i<collection.length; i++) {
      if (iterator(collection[i])==breaker) break
    }
  }

  var nothing = function(){
    return null
  }
  
  var doubleEquals = function(a,b){
    return a == b
  }
  
  var newArray = function(){
    return []
  }
  
  var arrayPush = function(array, item){
    array.push(item)
  }
  
  var isArray = function(thing){
    return typeof thing.length != "undefined"
  }
  
  return CollectionFunctions(arrayEach, breaker, nothing, doubleEquals, newArray, arrayPush, isArray)
}

setupArrayEach = function() {  
  var cf = {}
  arrayEachCf().decorate(cf)
  return cf
}