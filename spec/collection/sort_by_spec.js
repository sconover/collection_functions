require("./spec_helper.js");

describe("sort by", function() {
  
  var fArr = CollectionFunctions.Array.functions
  
  it("sorts the collection by the value returned out of the callback", function(){
    expect(fArr.sortBy([5,6,7,8], function(item){return -1 * item})).toEqual([8,7,6,5])
    expect(fArr.sortBy([5,7,8,6], function(item){return item})).toEqual([5,6,7,8])
    expect(fArr.sortBy([], function(item){return -1 * item})).toEqual([])
  })
  
  describe("feature requirements", function(){

    it("requires iterator, newCollection, and append", function(){
      expect(CollectionFunctions({}).functions.
        sortBy).toBeUndefined()
        
      expect(CollectionFunctions({iterator:fArr.iterator}).functions.
        sortBy).toBeUndefined()

      expect(CollectionFunctions({iterator:fArr.iterator, 
                                  newCollection:function(){return []},
                                  append:function(array, item){array.push(item)}}).functions.
        sortBy).toBeDefined()
    })    
    
    it("works with iterator, newCollection, and append", function(){
      var fMin = CollectionFunctions({iterator:fArr.iterator, 
                                      newCollection:function(){return []},
                                      append:function(array, item){array.push(item)}}).functions
      expect(fMin.sortBy([6,5,8,7], function(item){return -1 * item})).toEqual([8,7,6,5])
    })

  })
  
  describe("cost", function() {
    
    it("is 2N (two maps)", function(){      
      var fMin = CollectionFunctions({iterator:fArr.iterator, 
                                      newCollection:function(){return []},
                                      append:function(array, item){array.push(item)}}).withStatTracking.functions
      expect(fMin.sortBy([6,5,8,7], function(item){return -1 * item})).toEqual([8,7,6,5])
      expect(fMin.lastCost()).toEqual(8)
    })
  })
})

