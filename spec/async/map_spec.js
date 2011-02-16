require("./spec_helper.js");

describe("map", function() {
  
  var f = AsyncFunctions().functions
  
  //in a way "stream" is now inaccurate. 
  //stream implies order.  async means it may or may not be ordered,
  //there's no way for the library to tell
  //in fact there's no way for the library to even get in the way...it just getting called back and doing some tranform on the result.

  it("simply transforms a value from a callback", function(){
    var results = []    
    var mapper = f.map(function(item){return "x" + item}, function(transformedItem){results.push(transformedItem)})
    
    mapper(1)
    mapper(2)

    expect(results).toEqual(["x1", "x2"])
    
    mapper(3)
    
    expect(results).toEqual(["x1", "x2", "x3"])
  })    
})
