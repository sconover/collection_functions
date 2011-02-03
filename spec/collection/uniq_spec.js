require("./spec_helper.js");

describe("uniq", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("drops duplicate values", function(){
    var result = fArr.uniq([7,8,9,10,10,11,10,9,10])
    expect(result).toEqual([7,8,9,10,11])
  })

  describe("feature requirements", function(){

    it("requires newCollection, iterator, append, nothing, and equals", function(){
      expect(CollectionFunctions({}).functions.
        uniq).toBeUndefined()
        
      expect(CollectionFunctions({iterator:fArr.iterator}).functions.
        uniq).toBeUndefined()

      expect(CollectionFunctions({newCollection:function(){return []}, 
                                  iterator:fArr.iterator,
                                  append:function(array, item){array.push(item)},
                                  nothing:function(){return null},
                                  equals:function(a,b){return a==b}}).functions.
        uniq).toBeDefined()
    })    

    it("works with newCollection, iterator, nothing, and equals", function(){
      var fMin = CollectionFunctions({newCollection:function(){return []}, 
                                      iterator:fArr.iterator,
                                      append:function(array, item){array.push(item)},
                                      nothing:function(){return null},
                                      equals:function(a,b){return a==b}}).functions
      var result = fMin.uniq([7,8,9,10,10,11,10,9,10])
      expect(result).toEqual([7,8,9,10,11])
    })    

  })
    
  it("cost is high.  this is inefficient for now.", function(){
    fArr.uniq([7,8,9,10,10,11])
    expect(fArr.lastCost()).toEqual(20)
  })
    
})

