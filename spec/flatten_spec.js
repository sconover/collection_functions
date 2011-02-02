require("./spec_helper.js");

describe("flatten", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("takes nested collections and flattens them out", function(){
    var result = fArr.flatten([1,[2,[3,4]],5,[6,[7]]])
    expect(result).toEqual([1,2,3,4,5,6,7])
  })
  
  it("returns the same collection if there's nothing to do", function(){
    var result = fArr.flatten([1,2,3,4,5,6,7])
    expect(result).toEqual([1,2,3,4,5,6,7])
  })
  
  describe("feature requirements", function(){

    it("requires iterator, newCollection, and isCollection", function(){
      expect(CollectionFunctions({iterator:fArr.iterator}).functions.
        flatten).toBeUndefined()

      expect(CollectionFunctions({newCollection:function(){return []}}).functions.
        flatten).toBeUndefined()

      expect(CollectionFunctions({isCollection:function(thing){ return typeof thing.length != "undefined" }}).functions.
        flatten).toBeUndefined()

      expect(CollectionFunctions({append:function(array, item){array.push(item)}}).functions.
        flatten).toBeUndefined()

      expect(CollectionFunctions({iterator:fArr.iterator,
                                  newCollection:function(){return []},
                                  isCollection:function(thing){ return typeof thing.length != "undefined" },
                                  append:function(array, item){array.push(item)}}).functions.
        flatten).toBeDefined()
    })    

    it("works with iterator, newCollection, and isCollection", function(){
      var fMin = CollectionFunctions({iterator:fArr.iterator,
                                      newCollection:function(){return []},
                                      isCollection:function(thing){ return typeof thing.length != "undefined" },
                                      append:function(array, item){array.push(item)}}).functions
                                      
      var result = fMin.flatten([1,[2,[3,4]],5,[6,[7]]])
      expect(result).toEqual([1,2,3,4,5,6,7])
    })    

  })
  
})

