require("./spec_helper.js");

describe("map", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("using the transformer function, convert each item of the collection and return as a new collection", function(){
    var result = fArr.map([7,8,9], function(item){return "x" + item})
    expect(result).toEqual(["x7", "x8", "x9"])
  })
  
  it("use the supplied new collection and append to collection methods if supplied", function(){
    var newCollection = function(){return {}}
    var appender = function(collection, item){collection[item] = item}
    var result = fArr.map([7,8,9], function(item){return "x" + item}, newCollection, appender)
    expect(result).toEqual({x7:"x7", x8:"x8", x9:"x9"})
  })
  
  it("yields the index too", function(){
    var indexes = []
    fArr.map([7,8,9], function(item, i){
      indexes.push(i)
      return "x" + item
    })
    expect(indexes).toEqual([0,1,2])
  })
  
  it("costs the number items in the collection", function(){
    fArr.map([7,8,9], function(item){return "x" + item})
    expect(fArr.lastCost()).toEqual(3)
  })
  
  describe("feature requirements", function(){

    it("requires newCollection, append, and iterator", function(){
      expect(CollectionFunctions({}).functions.
        map).toBeUndefined()
      
      expect(CollectionFunctions({iterator:fArr.iterator}).functions.
        map).toBeUndefined()
      
      expect(CollectionFunctions({newCollection:function(){return []},
                                  iterator:fArr.iterator,
                                  append:function(array, item){array.push(item)}}).functions.
        map).toBeDefined()
    })    

    it("works with newCollection, append, and iterator", function(){
      var fMin = CollectionFunctions({iterator:fArr.iterator,
                                      newCollection:function(){return []},
                                      append:function(array, item){array.push(item)}}).functions
      
      var result = fMin.map([7,8,9], function(item){return "x" + item})
      expect(result).toEqual(["x7", "x8", "x9"])
    })    

  })
  
    
})

