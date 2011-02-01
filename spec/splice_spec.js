require("./spec_helper.js");

describe("splice", function() {
  
  beforeEach(function(){ this.cf = setupArrayEach() })
      
  it("splice in another collection at the given position", function(){
    var result = this.cf.splice([5,6,10,11], [7,8,9], 2)
    expect(result).toEqual([5,6,7,8,9,10,11])
  })
  
  it("splice in another collection, overwriting some items in the original collection", function(){
    var result = this.cf.splice([5,6,777,888,999,10,11], [7,8,9], 2, 3)
    expect(result).toEqual([5,6,7,8,9,10,11])
  })
  
})

