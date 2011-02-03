require("./spec_helper.js");

describe("map", function() {
  
  var f = StreamFunctions({eof:EOF}).functions
  
  it("returns an iterator for matches in the stream", function(){
    var stream = arrayStream([4,5,6])
    var nextTransform = f.map(stream, function(item){return "x" + item})
    expect(nextTransform()).toEqual("x4")
    expect(nextTransform()).toEqual("x5")
    expect(nextTransform()).toEqual("x6")
    expect(f.eof(nextTransform())).toEqual(true)
    expect(f.eof(nextTransform())).toEqual(true)
  })

  it("map can 'play' into an appender", function(){
    var stream = arrayStream([4,5,6])
    var map = f.map(stream, function(item){return "x" + item})
    
    var arr = []
    map.into(function(item){arr.push(item)})
    expect(arr).toEqual(["x4", "x5", "x6"])
  })
  
})

