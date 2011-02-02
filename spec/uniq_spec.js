require("./spec_helper.js");

describe("uniq", function() {
  
  beforeEach(function(){ this.cf = setupArrayEach() })
      
  it("drops duplicate values", function(){
    var result = this.cf.uniq([7,8,9,10,10,11,10,9,10])
    expect(result).toEqual([7,8,9,10,11])
  })
    
  it("cost is high.  this is inefficient for now.", function(){
    this.cf.uniq([7,8,9,10,10,11])
    expect(this.cf.lastCost()).toEqual(20)
  })
    
})

