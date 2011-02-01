require("./spec_helper.js");

describe("equals", function() {
  
  beforeEach(function(){ this.cf = setupArrayEach() })
      
  it("is equal if the contents are equal and in matching positions", function(){
    expect(this.cf.equals([7,8,9,10], [7,8,9,10])).toEqual(true)
    
    expect(this.cf.equals([7,8,9,10,10], [7,8,9,10])).toEqual(false)
    expect(this.cf.equals([7,8,9], [7,8,9,10])).toEqual(false)
    
    expect(this.cf.equals([7,8,9,10], [7,8,9,10,10])).toEqual(false)
    expect(this.cf.equals([7,8,9,10], [7,8,9])).toEqual(false)
    
    expect(this.cf.equals([99,8,9,10], [7,8,9,10])).toEqual(false)
  })
      
  it("costs what it takes to get to the first non-equal item", function(){
    this.cf.equals([7,8,9,10], [7,8,9999,10])
    expect(this.cf.lastCost()).toEqual(3)
  })
      
})

