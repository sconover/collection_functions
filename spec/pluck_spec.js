require("./spec_helper.js");

describe("pluck - a convenient form of map", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("for each item, 'plucks' the property name, creating a new array with the results", function(){
    var arr = [{a:1, b:'X'}, {a:2, b:'Y'}, {a:3, b:'Z'}]
    expect(fArr.pluck(arr, 'a')).toEqual([1,2,3])
    expect(fArr.pluck(arr, 'b')).toEqual(['X','Y','Z'])
  })

  it("if there's a function with that name, try to invoke it", function(){
    var arr = [{a:function(){return 1}}, {a:function(){return 2}}, {a:function(){return 3}}]
    expect(fArr.pluck(arr, 'a')).toEqual([1,2,3])
  })

  describe("feature requirements", function(){

    it("requires newCollection, append, and iterator", function(){
      expect(CollectionFunctions({}).functions.
        pluck).toBeUndefined()
      
      expect(CollectionFunctions({iterator:fArr.iterator}).functions.
        pluck).toBeUndefined()
      
      expect(CollectionFunctions({newCollection:function(){return []},
                                  iterator:fArr.iterator,
                                  append:function(array, item){array.push(item)}}).functions.
        pluck).toBeDefined()
    })    

    it("works with newCollection, append, and iterator", function(){
      var fMin = CollectionFunctions({iterator:fArr.iterator,
                                      newCollection:function(){return []},
                                      append:function(array, item){array.push(item)}}).functions

      var arr = [{a:1, b:'X'}, {a:2, b:'Y'}, {a:3, b:'Z'}]
      expect(fMin.pluck(arr, 'a')).toEqual([1,2,3])
    })    

  })

})

