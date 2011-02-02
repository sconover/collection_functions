require("./spec_helper.js");

describe("differ", function() {
  
  beforeEach(function(){ this.cf = CollectionFunctions.Array.functions })
      
  it("return the items common to both collections", function(){
    var result = this.cf.differ([7,7,8,9,10,10,11], [8,10])
    expect(result).toEqual([7,9,11])
  })
    
  it("cost is high.  this is inefficient for now.", function(){
    this.cf.differ([7,7,8,9,10,10,11], [8,10])
    expect(this.cf.lastCost()).toEqual(28)
  })
    
})

