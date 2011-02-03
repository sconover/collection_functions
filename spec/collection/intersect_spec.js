require("./spec_helper.js");

describe("intersect", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("return the items common to both collections", function(){
    var result = fArr.intersect([7,8,9,10,10,11], [8,10,10])
    expect(result).toEqual([8,10])
  })

  describe("feature requirements", function(){

    it("requires newCollection, iterator, append, nothing, and equals", function(){
      expect(CollectionFunctions({}).functions.
        intersect).toBeUndefined()
        
      expect(CollectionFunctions({iterator:fArr.iterator}).functions.
        intersect).toBeUndefined()

      expect(CollectionFunctions({newCollection:function(){return []}, 
                                  iterator:fArr.iterator,
                                  append:function(array, item){array.push(item)},
                                  nothing:function(){return null},
                                  equals:function(a,b){return a==b}}).functions.
        intersect).toBeDefined()
    })    

    it("works with newCollection, iterator, nothing, and equals", function(){
      var fMin = CollectionFunctions({newCollection:function(){return []}, 
                                      iterator:fArr.iterator,
                                      append:function(array, item){array.push(item)},
                                      nothing:function(){return null},
                                      equals:function(a,b){return a==b}}).functions
      var result = fMin.intersect([7,8,9,10,10,11], [8,10,10])
      expect(result).toEqual([8,10])
    })    

  })
    
  it("cost is high.  this is inefficient for now.", function(){
    fArr.intersect([7,8,9,10,10,11], [8,10,10])
    expect(fArr.lastCost()).toEqual(26)
  })
    
})

