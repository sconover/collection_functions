require("./spec_helper.js");

describe("size", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("returns the size of the collection", function(){
    var result = fArr.size([5,6,7,8])
    expect(result).toEqual(4)
  })
  
  describe("cost", function() {
    
    it("cost is N if no length function is supplied", function(){
      var fMin = minimalArrayCF().functions
      expect(fMin.size([5,6,7,8])).toEqual(4)
      expect(fMin.lastCost()).toEqual(4)
    })
    
    it("cost is constant if a size function is supplied", function(){
      var fMinPlusSize = 
        minimalArrayCF().
          appendFeatures({
            size: function(arr){return arr.length}
          }).functions
      expect(fMinPlusSize.size([5,6,7,8])).toEqual(4)
      expect(fMinPlusSize.lastCost()).toEqual(0)
    })
    
    it("default array size function is efficient", function(){
      expect(fArr.size([5,6,7,8])).toEqual(4)
      expect(fArr.lastCost()).toEqual(0)
    })
    
  })
})

