require("./spec_helper.js");

describe("include", function() {
  
  beforeEach(function(){ this.cf = setupArrayEach() })
      
  it("finds the index of the first match from the collection", function(){
    var result = this.cf.include([7,8,8,9], 8)
    expect(result).toEqual(1)
  })
  
  it("returns null if there's no match", function(){
    var result = this.cf.include([7,8,8,9], 22)
    expect(result).toEqual(null)
  })
  
  it("costs the number of iterations to the 'hit' (not more)", function(){
    this.cf.include([7,8,8,9], 8)
    expect(this.cf.lastCost()).toEqual(2)
  })
    
})

