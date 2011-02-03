require("./spec_helper.js");

describe("iterator", function() {
  
  var fArr = CollectionFunctions.Array.functions
  
  it("makes a new instance of an iterator - starting at the beginning of the collection", function(){
    var source = [7,8,9]
    var one = fArr.iterator(source)
    expect(one.hasNext()).toEqual(true)
    expect(one.next()).toEqual(7)
    expect(one.next()).toEqual(8)
    expect(one.hasNext()).toEqual(true)
    
    var two = fArr.iterator(source)
    expect(two.hasNext()).toEqual(true)
    expect(two.next()).toEqual(7)
    expect(two.hasNext()).toEqual(true)
    
    expect(one.next()).toEqual(9)
    expect(one.hasNext()).toEqual(false)
    
    expect(two.next()).toEqual(8)
    expect(two.next()).toEqual(9)
    expect(two.hasNext()).toEqual(false)
  })
  
  describe("feature requirements", function(){
    it("requires iterator ;-)", function(){
      expect(CollectionFunctions({}).functions.
        iterator).toBeUndefined()
        
      expect(CollectionFunctions({iterator:fArr.iterator}).functions.
        iterator).toBeDefined()
    })    
  })
  
})

