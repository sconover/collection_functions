require("./spec_helper.js");

describe("equals", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("is equal if the contents are equal and in matching positions", function(){
    expect(fArr.equals([7,8,9,10], [7,8,9,10])).toEqual(true)
    
    expect(fArr.equals([7,8,9,10,10], [7,8,9,10])).toEqual(false)
    expect(fArr.equals([7,8,9], [7,8,9,10])).toEqual(false)
    
    expect(fArr.equals([7,8,9,10], [7,8,9,10,10])).toEqual(false)
    expect(fArr.equals([7,8,9,10], [7,8,9])).toEqual(false)
    
    expect(fArr.equals([99,8,9,10], [7,8,9,10])).toEqual(false)
  })
      
  it("costs what it takes to get to the first non-equal item", function(){
    fArr.equals([7,8,9,10], [7,8,9999,10])
    expect(fArr.lastCost()).toEqual(3)
  })
      
})

