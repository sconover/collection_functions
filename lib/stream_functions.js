StreamFunctions = function(features) {
  var terminator = features.eof || {}
  var functionsForExport = {}
  
  function eof(thing) {
    return thing === terminator
  }
  functionsForExport.eof = eof
  
  
  function select(stream, matcher) {
    return function() {
      var candidate = null
      while (!eof(candidate=stream())) {
        if (matcher(candidate)) return candidate
      }
      return terminator      
    }
  }
  functionsForExport.select = select

  function map(stream, transformer) {
    return function() {
      var item = stream()
      if (eof(item)) return terminator
      return transformer(item)
    }
  }
  functionsForExport.map = map

  return {functions:functionsForExport}    
}