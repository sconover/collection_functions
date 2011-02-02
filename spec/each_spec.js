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
    
    it("requires iterator (of course)", function(){
      var fBare = CollectionFunctions({}).functions
      var attemptEach = function(){fBare.each([4,5,6], function(item){/*never gets here*/})}
      expect(attemptEach).toThrow("Feature 'iterator' is required in order to perform this operation.")
    })
    
    it("works if just iterator is specified", function(){
      var fJustIterator = CollectionFunctions({iterator:fArr.iterator}).functions
      var results = []
      fJustIterator.each([7,8,9], function(item){results.push(item)})
      expect(results).toEqual([7,8,9])
    })
    
  })
  
  describe("cost", function(){
    it("is the number of items iterated through (N)", function(){
      fArr.each([7,8,9], function(item, i){})
      expect(fArr.lastCost()).toEqual(3)
    })
  })
})

