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
  
  describe("feature requirements", function(){

    it("requires iterator, nothing, equals, append, newCollection", function(){
      expect(CollectionFunctions({nothing:function(){return null}}).functions.
        equals).toBeUndefined()

      expect(CollectionFunctions({iterator:fArr.iterator}).functions.
        equals).toBeUndefined()

      expect(CollectionFunctions({equals:function(a,b){return a==b}}).functions.
        equals).toBeUndefined()

      expect(CollectionFunctions({newCollection:function(){return []}}).functions.
        equals).toBeUndefined()

      expect(CollectionFunctions({append:function(array, item){array.push(item)}}).functions.
        equals).toBeUndefined()

      expect(CollectionFunctions({nothing:function(){return null}, 
                                  iterator:fArr.iterator,
                                  equals:function(a,b){return a==b},
                                  append:function(array, item){array.push(item)},
                                  newCollection:function(){return []}}).functions.
        equals).toBeDefined()
    })    

    it("works with iterator, nothing, equals, append, newCollection", function(){
      var fMin = CollectionFunctions({iterator:fArr.iterator, 
                                      nothing:function(){return null}, 
                                      equals:function(a,b){return a==b},
                                      append:function(array, item){array.push(item)},
                                      newCollection:function(){return []}}).functions
      expect(fMin.equals([8,9,10], [8,9,10])).toEqual(true)
      expect(fMin.equals([8,9,10], [0,1,2,3])).toEqual(false)
    })    

  })
  
  
  describe("cost", function(){
    
    it("costs what it takes to get to the first non-equal item", function(){
      var fArrWithStats = CollectionFunctions.Array.withStatTracking.functions
      
      fArrWithStats.equals([7,8,9,10], [7,8,9999,10])
      expect(fArrWithStats.lastCost()).toEqual(6)
    })
    
  })    
      
})

