require("./spec_helper.js");

describe("differ", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("return the items common to both collections", function(){
    var result = fArr.differ([7,7,8,9,10,10,11], [8,10])
    expect(result).toEqual([7,9,11])
  })

  describe("feature requirements", function(){

    it("requires newCollection, iterator, append, nothing, and equals", function(){
      expect(CollectionFunctions({}).functions.
        differ).toBeUndefined()
        
      expect(CollectionFunctions({iterator:fArr.iterator}).functions.
        differ).toBeUndefined()

      expect(CollectionFunctions({newCollection:function(){return []}, 
                                  iterator:fArr.iterator,
                                  append:function(array, item){array.push(item)},
                                  nothing:function(){return null},
                                  equals:function(a,b){return a==b}}).functions.
        differ).toBeDefined()
    })    

    it("works with newCollection, iterator, nothing, and equals", function(){
      var fMin = CollectionFunctions({newCollection:function(){return []}, 
                                      iterator:fArr.iterator,
                                      append:function(array, item){array.push(item)},
                                      nothing:function(){return null},
                                      equals:function(a,b){return a==b}}).functions
      var result = fMin.differ([7,7,8,9,10,10,11], [8,10])
      expect(result).toEqual([7,9,11])
    })    

  })


  describe("cost", function(){

    it("is high.  this is inefficient for now.", function(){
      fArr.differ([7,7,8,9,10,10,11], [8,10])
      expect(fArr.lastCost()).toEqual(28)
    })

  })
    
})

