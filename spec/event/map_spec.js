require("./spec_helper.js");

describe("map", function() {
  
  var f = EventFunctions().functions
  
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
