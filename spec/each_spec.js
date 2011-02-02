require("./spec_helper.js");

describe("each", function() {
  
  var fArr = CollectionFunctions.Array.functions
  
  it("yields each member of the collection", function(){
    var results = []
    fArr.each([7,8,9], function(item){results.push(item)})
    expect(results).toEqual([7,8,9])
  })
  
  it("yields the index alongside the item", function(){
    var indexes = []
    fArr.each([7,8,9], function(item, i){indexes.push(i)})
    expect(indexes).toEqual([0,1,2])
  })
    
  describe("feature requirements", function(){
    it("requires iterator", function(){
      expect(CollectionFunctions({}).functions.
        each).toBeUndefined()
        
      expect(CollectionFunctions({iterator:fArr.iterator}).functions.
        each).toBeDefined()
    })    
  })
  
  describe("cost", function(){
    it("is the number of items iterated through (N)", function(){
      fArr.each([7,8,9], function(item, i){})
      expect(fArr.lastCost()).toEqual(3)
    })
  })
})

