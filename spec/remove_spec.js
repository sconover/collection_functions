require("./spec_helper.js");

describe("remove", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("removes the value at an index", function(){
    var result = fArr.remove([7,8,9,10], 2)
    expect(result).toEqual([7,8,10])
  })
    
  it("cost is the length of the collection due to creation of new collection", function(){
    fArr.remove([7,8,9,10], 2)
    expect(fArr.lastCost()).toEqual(4)
  })
    
})

