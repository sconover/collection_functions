require("./spec_helper.js");

describe("size", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("returns the size of the collection", function(){
    var result = fArr.size([5,6,7,8])
    expect(result).toEqual(4)
  })
  
  describe("cost", function() {
    
    xit("cost is N if no length function is supplied", function(){
      var fMin = minimalArrayCF().functions
      expect(fMin.size([5,6,7,8])).toEqual(4)
      expect(fMin.lastCost()).toEqual(4)
    })
    
    xit("cost is constant if a length function is supplied", function(){
      expect(fArr.size([5,6,7,8])).toEqual(4)
      expect(fArr.lastCost()).toEqual(0)
    })
    
  })
})

