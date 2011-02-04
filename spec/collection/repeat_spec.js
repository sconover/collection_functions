require("./spec_helper.js");

describe("repeat", function() {
  
  var fArr = CollectionFunctions.Array.functions
  
  it("repeats the collection N times", function(){
    expect(fArr.repeat([7], 3)).toEqual([7,7,7])
    expect(fArr.repeat([7,8,9], 3)).toEqual([7,8,9, 7,8,9, 7,8,9])
    
    expect(fArr.repeat([], 3)).toEqual([])
    expect(fArr.repeat([7], 1)).toEqual([7])
    expect(fArr.repeat([7], 0)).toEqual([])
  })
  
  describe("feature requirements", function(){

    it("requires newCollection and append features if you don't have a concat feature", function(){
      expect(CollectionFunctions({}).functions.
        repeat).toBeUndefined()
        
      expect(CollectionFunctions({newCollection:function(){return []}}).functions.
        repeat).toBeUndefined()

      expect(CollectionFunctions({newCollection:function(){return []}, 
                                  append:function(array, item){array.push(item)}}).functions.
        repeat).toBeDefined()
    })    

    it("is available if you supply concat and newCollection", function(){
      expect(CollectionFunctions({}).functions.
        repeat).toBeUndefined()

      expect(
        CollectionFunctions({newCollection:function(){return []},
                             concat:function(){
                              var firstArray = arguments[0]
                              var otherArrays = []
                              for(var i=1; i<arguments.length; i++) {otherArrays[i-1] = arguments[i]}
                              return firstArray.concat.apply(firstArray, otherArrays)
                            }}).functions.
        repeat).toBeDefined()
    })    

  })
  
  describe("cost", function() {    
    it("is expensive without concat", function(){      
      var fMin = CollectionFunctions({iterator:fArr.iterator, 
                                      newCollection:function(){return []},
                                      append:function(array, item){array.push(item)}}).withStatTracking.functions
      expect(fMin.repeat([7,8], 3)).toEqual([7,8,7,8,7,8])
      expect(fMin.lastCost()).toEqual(12)
    })

    it("is 0 with concat", function(){      
      var fMin = CollectionFunctions({newCollection:function(){return []},
                                      append:function(array, item){array.push(item)},
                                      concat:function(){
                                        var firstArray = arguments[0]
                                        var otherArrays = []
                                        for(var i=1; i<arguments.length; i++) {otherArrays[i-1] = arguments[i]}
                                        return firstArray.concat.apply(firstArray, otherArrays)
                                      }}).withStatTracking.functions
      expect(fMin.repeat([7,8], 3)).toEqual([7,8,7,8,7,8])
      expect(fMin.lastCost()).toEqual(0)
    })
  })
})

