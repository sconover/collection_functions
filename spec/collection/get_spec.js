require("./spec_helper.js");

describe("at index", function() {
  
  var fArr = CollectionFunctions.Array.functions
  
  it("gets a value at a position", function(){
    expect(fArr.get([7,8,9], 0)).toEqual(7)
    expect(fArr.get([7,8,9], 1)).toEqual(8)
    expect(fArr.get([7,8,9], 2)).toEqual(9)
  })
  
  it("gets values at positions", function(){
    expect(fArr.get([7,8,9], [0,2])).toEqual([7,9])
    
    expect(fArr.get([7,8,9], [2])).toEqual([9])
    expect(fArr.get([7,8,9], [])).toEqual([])
  })
  
  describe("feature requirements", function(){

    it("requires iterator", function(){
      expect(CollectionFunctions({}).functions.
        get).toBeUndefined()
        
      expect(CollectionFunctions({iterator:fArr.iterator}).functions.
        get).toBeDefined()
    })    

    it("...or requires get", function(){
      expect(CollectionFunctions({}).functions.
        get).toBeUndefined()
        
      expect(CollectionFunctions({get:function(array, index){return array[index]}}).functions.
        get).toBeDefined()
    })    

  })
  
  describe("cost", function() {
    
    it("cost is the number of iterations to get to the index, if there's no 'get' feature", function(){      
      var fMin = minimalArrayCF().appendFeatures({iterator:fArr.iterator}).withStatTracking.functions
      fMin.get([5,6,7,8], 2)
      expect(fMin.lastCost()).toEqual(3)
    })
    
    it("cost is zero if there's a 'get' feature", function(){      
      var fMin = minimalArrayCF().appendFeatures({get:function(array, index){return array[index]}}).withStatTracking.functions
      fMin.get([5,6,7,8], 2)
      expect(fMin.lastCost()).toEqual(0)
    })
    
    it("array cf has a 'get' feature specified", function(){      
      var fArr = CollectionFunctions.Array.withStatTracking.functions  
      fArr.get([5,6,7,8], 2)
      expect(fArr.lastCost()).toEqual(0)
    })
    
  })
})

