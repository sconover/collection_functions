require("./spec_helper.js");

describe("intersect", function() {
  
  beforeEach(function(){ this.cf = setupArrayEach() })
      
  it("return the items common to both collections", function(){
    var result = this.cf.intersect([7,8,9,10,10,11], [8,10,10])
    expect(result).toEqual([8,10])
  })
    
  it("cost is high.  this is inefficient for now.", function(){
    this.cf.intersect([7,8,9,10,10,11], [8,10,10])
    expect(this.cf.lastCost()).toEqual(26)
  })
    
})

