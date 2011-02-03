require("./spec_helper.js");

describe("detect", function() {
  
  var f = StreamFunctions({eof:EOF}).functions
  
  it("finds the next occurrence in a stream and then stops", function(){
    var stream = arrayStream([1,2,3,4,5,6])
    expect(f.detect(stream, function(item){return item %2==0})).toEqual(2)
    expect(f.detect(stream, function(item){return item %2==0})).toEqual(4)
    expect(f.detect(stream, function(item){return item %2==0})).toEqual(6)    
    expect(f.eof(f.detect(stream, function(item){return item %2==0}))).toEqual(true)
  })
  
  it("returns eof if there's no match", function(){
    var stream = arrayStream([1,2,3,4,5,6])
    var result = f.detect(stream, function(item){return item == 99})
    expect(f.eof(result)).toEqual(true)
  })
    
})

