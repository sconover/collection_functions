require("./spec_helper.js");

describe("slice", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("slices part of a collection - start + length", function(){
    var result = fArr.slice([5,6,7,8], 1, 3)
    expect(result).toEqual([6,7,8])

    result = fArr.slice([5,6,7,8], 1, 2)
    expect(result).toEqual([6,7])
  })
  
  it("slices part of a collection - start + end range", function(){
    result = fArr.slice([5,6,7,8], [0, 2])
    expect(result).toEqual([5,6,7])
  })
  
  it("slices part of a collection - range, where negative means work backwards from the end", function(){
    result = fArr.slice([5,6,7,8,9], [0, -2])
    expect(result).toEqual([5,6,7,8])
  })
  
})

