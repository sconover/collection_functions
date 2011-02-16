AsyncFunctions = function(features) {
  var functionsForExport = {}
  
  function filter(selector, callback) {
    return function(item) {
      if (selector(item)) callback(item)
    }
  }
  functionsForExport.filter = filter
  
  function map(transformer, callback) {
    return function(item) {
      callback(transformer(item))
    }
  }
  functionsForExport.map = map
  
  return {functions:functionsForExport}    
}