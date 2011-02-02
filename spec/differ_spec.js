require("./spec_helper.js");

describe("differ", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("return the items common to both collections", function(){
    var result = fArr.differ([7,7,8,9,10,10,11], [8,10])
    expect(result).toEqual([7,9,11])
  })

  describe("cost", function(){

    it("is high.  this is inefficient for now.", function(){
      fArr.differ([7,7,8,9,10,10,11], [8,10])
      expect(fArr.lastCost()).toEqual(28)
    })

  })
    
})

