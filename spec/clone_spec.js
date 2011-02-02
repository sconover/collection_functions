require("./spec_helper.js");

describe("clone", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("shallow-copy a collection", function(){
    var obj = {a:1}
    var original = [1, obj, 2]
    var result = fArr.clone(original)
    expect(result).toEqual([1, obj, 2])
    
    original.push(3)
    expect(result).toEqual([1, obj, 2])
    
    obj.a = 99
    expect(result).toEqual([1, obj, 2])
  })
    
})

