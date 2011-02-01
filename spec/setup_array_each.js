arrayEachCf = function() {  
  var arrayIterator = function(collection){
    var position = 0
    return {
      next: function() {
        var result = collection[position]
        position += 1
        return result
      },
      hasNext: function(){return position<collection.length}
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
  
  return CollectionFunctions(arrayIterator, nothing, doubleEquals, newArray, arrayPush, isArray)
}

setupArrayEach = function() {  
  var cf = {}
  arrayEachCf().decorate(cf)
  return cf
}