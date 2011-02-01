require("./spec_helper.js");

describe("all", function() {
  
  beforeEach(function(){ this.cf = setupArrayEach() })
  
  it("returns all members of the collection in a new collection wrapper", function(){
    var original = [7,8,9]
    var results = this.cf.all(original)
    expect(results).toEqual(original)
    
    original.push(999)
    expect(results).toEqual([7,8,9])
  })
  
})

