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

  describe("feature requirements", function(){

    it("requires newCollection, append, and iterator", function(){
      expect(CollectionFunctions({}).functions.
        slice).toBeUndefined()
      
      expect(CollectionFunctions({iterator:fArr.iterator}).functions.
        slice).toBeUndefined()
      
      expect(CollectionFunctions({newCollection:function(){return []},
                                  iterator:fArr.iterator,
                                  append:function(array, item){array.push(item)}}).functions.
        slice).toBeDefined()
    })    

    it("works with newCollection, append, and iterator", function(){
      var fMin = CollectionFunctions({iterator:fArr.iterator,
                                      newCollection:function(){return []},
                                      append:function(array, item){array.push(item)}}).functions
      
      var result = fMin.slice([5,6,7,8], 1, 3)
      expect(result).toEqual([6,7,8])
    })    

  })
  
})

