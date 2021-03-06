require("./spec_helper.js");

describe("zip", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("zip is like multi-each if you provide it a callback", function(){
    var results = []
    fArr.zip([1,2,3], [4,5,6], [7,8,9], function(itemA, itemB, itemC, i) {
      results.push([itemA, itemB, itemC, i])
    })
    expect(results).toEqual([
      [1,4,7, 0],
      [2,5,8, 1],
      [3,6,9, 2]
    ])
  })
      
  it("zips up N collections, creating collections across matching indexes", function(){
    var result = fArr.zip([1,2,3], [4,5,6], [7,8,9])
    expect(result).toEqual([
      [1,4,7],
      [2,5,8],
      [3,6,9]
    ])
  })
      
  it("if a collection isn't as long as the others, fill in 'nothing'", function(){
    var result = fArr.zip([1,2,3], [4,5], [7])
    expect(result).toEqual([
      [1,4,7],
      [2,5,null],
      [3,null, null]
    ])
  })
      
})

