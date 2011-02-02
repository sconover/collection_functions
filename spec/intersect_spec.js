require("./spec_helper.js");

describe("intersect", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("return the items common to both collections", function(){
    var result = fArr.intersect([7,8,9,10,10,11], [8,10,10])
    expect(result).toEqual([8,10])
  })
    
  it("cost is high.  this is inefficient for now.", function(){
    fArr.intersect([7,8,9,10,10,11], [8,10,10])
    expect(fArr.lastCost()).toEqual(26)
  })
    
})

