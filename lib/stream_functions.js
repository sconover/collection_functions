StreamFunctions = function(features) {
  var terminator = features.eof || {}
  var functionsForExport = {}
  
  function eof(thing) {
    return thing === terminator
  }
  functionsForExport.eof = eof
  
  function into(stream, acceptor) {
    var result = null
    while(!eof(result=stream())) {
      acceptor(result)
    }
  }
  
  function decorateInto(stream) {
    stream.into = function(acceptor){into(stream, acceptor)}
    return stream
  }
  
  
  function select(stream, matcher) {
    return decorateInto(function() {
      var candidate = null
      while (!eof(candidate=stream())) {
        if (matcher(candidate)) return candidate
      }
      return terminator      
    })
  }
  functionsForExport.select = select

  function map(stream, transformer) {
    return decorateInto(function() {
      var item = stream()
      if (eof(item)) return terminator
      return transformer(item)
    })
  }
  functionsForExport.map = map
  
  return {functions:functionsForExport}    
}