require("./spec_helper.js");

describe("remove", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("removes the value at an index", function(){
    var result = fArr.remove([7,8,9,10], 2)
    expect(result).toEqual([7,8,10])
  })
    
  it("cost is the length of the collection due to creation of new collection", function(){
    var fArrWithStats = CollectionFunctions.Array.withStatTracking.functions
    
    fArrWithStats.remove([7,8,9,10], 2)
    expect(fArrWithStats.lastCost()).toEqual(4)
  })

  describe("feature requirements", function(){

    it("requires newCollection, append, and iterator", function(){
      expect(CollectionFunctions({}).functions.
        remove).toBeUndefined()
      
      expect(CollectionFunctions({iterator:fArr.iterator}).functions.
        remove).toBeUndefined()
      
      expect(CollectionFunctions({newCollection:function(){return []},
                                  iterator:fArr.iterator,
                                  append:function(array, item){array.push(item)}}).functions.
        remove).toBeDefined()
    })    

    it("works with newCollection, append, and iterator", function(){
      var fMin = CollectionFunctions({iterator:fArr.iterator,
                                      newCollection:function(){return []},
                                      append:function(array, item){array.push(item)}}).functions

      var result = fMin.remove([7,8,9,10], 2)
      expect(result).toEqual([7,8,10])
    })    

  })

    
})

