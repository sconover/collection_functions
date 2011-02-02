require("./spec_helper.js");

describe("all", function() {
  
  var fArr = CollectionFunctions.Array.functions
  
  it("returns all members of the collection in a new collection wrapper", function(){
    var original = [7,8,9]
    var results = fArr.all(original)
    expect(results).toEqual(original)
    
    original.push(999)
    expect(results).toEqual([7,8,9])
  })
  
})

