require("./spec_helper.js");

describe("size", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("returns the size of the collection", function(){
    var result = fArr.size([5,6,7,8])
    expect(result).toEqual(4)
  })
  
  describe("empty", function(){
    it("is empty when size is 0", function(){
      expect(fArr.empty([5,6,7,8])).toEqual(false)
      expect(fArr.empty([])).toEqual(true)
    })
  })
  
  describe("feature requirements", function(){

    it("requires iterator if you don't have the size feature", function(){
      expect(CollectionFunctions({}).functions.
        size).toBeUndefined()
        
      expect(CollectionFunctions({iterator:fArr.iterator}).functions.
        size).toBeDefined()
    })    

    it("is available if you supply a size features", function(){
      expect(CollectionFunctions({}).functions.
        size).toBeUndefined()
        
      expect(CollectionFunctions({size:function(array){return array.length}}).functions.
        size).toBeDefined()
    })    

  })
  
  describe("cost", function() {
    
    it("cost is N if no length function is supplied", function(){
      var fMin = minimalArrayCF().withStatTracking.functions
      expect(fMin.size([5,6,7,8])).toEqual(4)
      expect(fMin.lastCost()).toEqual(4)
    })
    
    it("cost is constant if a size function is supplied", function(){
      var fMinPlusSize = 
        minimalArrayCF().
          appendFeatures({
            size: function(arr){return arr.length}
          }).withStatTracking.functions
      expect(fMinPlusSize.size([5,6,7,8])).toEqual(4)
      expect(fMinPlusSize.lastCost()).toEqual(0)
    })
    
    it("default array size function is efficient", function(){
      var fArrWithStats = CollectionFunctions.Array.withStatTracking.functions
      
      expect(fArrWithStats.size([5,6,7,8])).toEqual(4)
      expect(fArrWithStats.lastCost()).toEqual(0)
    })
    
  })
})

