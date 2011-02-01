require("./spec_helper.js");

describe("zip", function() {
  
  beforeEach(function(){ this.cf = setupArrayEach() })
      
  xit("zips up N collections, creating collections across matching indexes", function(){
    var result = this.cf.equals([1,2,3], [4,5,6], [7,8,9])
    expect(result).toEqual([
      [1,4,7],
      [2,5,8],
      [3,6,9]
    ])
  })
      
})

