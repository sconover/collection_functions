require("./spec_helper.js");

describe("uniq", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("drops duplicate values", function(){
    var result = fArr.uniq([7,8,9,10,10,11,10,9,10])
    expect(result).toEqual([7,8,9,10,11])
  })
    
  it("cost is high.  this is inefficient for now.", function(){
    fArr.uniq([7,8,9,10,10,11])
    expect(fArr.lastCost()).toEqual(20)
  })
    
})

