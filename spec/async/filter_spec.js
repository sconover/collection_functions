require("./spec_helper.js");

describe("filter", function() {
  
  var f = AsyncFunctions().functions
  
  it("filter out items", function(){
    var results = []    
    var filter = f.filter(function(item){return item % 3}, function(item){results.push(item)})
    
    filter(1)
    filter(2)
    filter(3)
    filter(4)
    filter(5)
    filter(6)
    filter(7)
    
    expect(results).toEqual([1,2,  4,5,  7])
  })    
})
