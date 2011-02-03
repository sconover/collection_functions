require("./spec_helper.js");

describe("select", function() {
  
  var f = StreamFunctions({eof:EOF}).functions
  
  it("returns an iterator for matches in the stream", function(){
    var stream = arrayStream([1,2,3,4,5,6])
    var nextMatch = f.select(stream, function(item){return item %2==0})
    expect(nextMatch()).toEqual(2)
    expect(nextMatch()).toEqual(4)
    expect(nextMatch()).toEqual(6)
    expect(f.eof(nextMatch())).toEqual(true)
  })
  
  it("returns eof if there's no match", function(){
    var stream = arrayStream([1,2,3,4,5,6])
    var nextMatch = f.select(stream, function(item){return item == 99})
    expect(f.eof(nextMatch())).toEqual(true)
  })
    
})

