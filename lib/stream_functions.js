StreamFunctions = function(features) {
  var terminator = features.eof || {}
  var functionsForExport = {}
  
  function eof(thing) {
    return thing === terminator
  }
  functionsForExport.eof = eof
  
  
  function detect(stream, matcher) {
    var candidate = null
    while (!eof(candidate=stream.next())) {
      if (matcher(candidate)) return candidate
    }
    return terminator
  }
  functionsForExport.detect = detect
  // 
  // function select(iterator, matcher) {
  //   return {
  //     var empty = {}
  //     var nextMatch == features.nothing()
  //     
  //     function advanceIfNecessary() {
  //       if (nextMatch === empty) nextMatch = detect(iterator, matcher)
  //       return nextMatch
  //     }
  //     
  //     hasNext: function() {
  //       return !(advanceIfNecessary() === terminator)
  //     },
  //     next: function() {
  //       if (!hasNext()) throw "after end"
  //       var result = advanceIfNecessary()
  //       nextMatch = empty
  //       return result
  //     }
  //   }
  // }
  // functionsForExport.select = select

  return {functions:functionsForExport}    
}