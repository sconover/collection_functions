require("./spec_helper.js");

describe("slice", function() {
  
  beforeEach(function(){ this.cf = setupArrayEach() })
      
  it("slices part of a collection - start + length", function(){
    var result = this.cf.slice([5,6,7,8], 1, 3)
    expect(result).toEqual([6,7,8])

    result = this.cf.slice([5,6,7,8], 1, 2)
    expect(result).toEqual([6,7])
  })
  
  it("slices part of a collection - start + end range", function(){
    result = this.cf.slice([5,6,7,8], [0, 2])
    expect(result).toEqual([5,6,7])
  })
  
  it("slices part of a collection - range, where negative means work backwards from the end", function(){
    result = this.cf.slice([5,6,7,8,9], [0, -2])
    expect(result).toEqual([5,6,7,8])
  })
  
})

