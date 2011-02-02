require("./spec_helper.js");

describe("detect", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("finds the first match from the collection", function(){
    var result = fArr.detect([7,8,9], function(item){return item==8 || item==9})
    expect(result).toEqual(8)
  })
  
  it("returns null if there's no match", function(){
    var result = fArr.detect([7,8,9], function(item){return item==22})
    expect(result).toEqual(null)
  })
  
  it("yields the index alongside the item", function(){
    var indexes = []
    fArr.detect([7,8,9], function(item, i){
      indexes.push(i)
      return item==8 || item==9
    })
    expect(indexes).toEqual([0,1])
  })

  describe("feature requirements", function(){
    it("requires nothing", function(){
      var fBare = CollectionFunctions({}).functions
      var attemptDetect = function(){fBare.detect([4,5,6], function(item){/*never gets here*/})}
      expect(attemptDetect).toThrow("Feature 'nothing' is required in order to perform this operation.")
    })
    
    it("requires iterator", function(){
      var fBarePlusNothing = CollectionFunctions({nothing:function(){return null}}).functions
      var attemptDetect = function(){fBarePlusNothing.detect([4,5,6], function(item){/*never gets here*/})}
      expect(attemptDetect).toThrow("Feature 'iterator' is required in order to perform this operation.")
    })
    
    it("works if nothing and iterator are specified", function(){
      var fIteratorAndNothing = CollectionFunctions({iterator:fArr.iterator, nothing:function(){return null}}).functions
      var result = fIteratorAndNothing.detect([7,8,9], function(item){return item==8 || item==9})
      expect(result).toEqual(8)
    })
  })
  
  describe("cost", function(){
    it("is the number of iterations to the 'hit' (not more)", function(){
      fArr.detect([7,8,9], function(item){return item==8 || item==9})
      expect(fArr.lastCost()).toEqual(2)
    })
  })

  
})

