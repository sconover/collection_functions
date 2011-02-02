require("./spec_helper.js");

describe("indexOf", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("finds the index of the first match from the collection", function(){
    var result = fArr.indexOf([7,8,8,9], 8)
    expect(result).toEqual(1)
  })
  
  it("returns null if there's no match", function(){
    var result = fArr.indexOf([7,8,8,9], 22)
    expect(result).toEqual(null)
  })
  
  it("costs the number of iterations to the 'hit' (not more)", function(){
    fArr.include([7,8,8,9], 8)
    expect(fArr.lastCost()).toEqual(2)
  })
    
})

describe("include", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("is like indexOf except returns boolean if found", function(){
    var result = fArr.include([7,8,8,9], 8)
    expect(result).toEqual(true)
  })
  
  it("returns false if there's no match", function(){
    var result = fArr.include([7,8,8,9], 22)
    expect(result).toEqual(false)
  })
  
})

