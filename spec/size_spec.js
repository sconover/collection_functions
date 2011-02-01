require("./spec_helper.js");

describe("size", function() {
  
  beforeEach(function(){ this.cf = setupArrayEach() })
      
  it("returns the size of the collection", function(){
    var result = this.cf.size([5,6,7,8])
    expect(result).toEqual(4)
  })
  
  it("the cost of this operation is terrible.  be more efficient by perhaps optionally passing a function, later.", function(){
    this.cf.size([5,6,7,8])
    expect(this.cf.lastCost()).toEqual(4)
  })
  
})

