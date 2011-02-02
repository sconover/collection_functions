require("./spec_helper.js");

describe("select", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("takes the matching members of the old collection and makes a new collection", function(){
    var result = fArr.select([7,8,9,10], function(item){return item % 2 == 0})
    expect(result).toEqual([8,10])
  })
  
  it("returns an empty collection if there are no matches", function(){
    var result = fArr.select([7,8,9,10], function(item){return item % 77 == 0})
    expect(result).toEqual([])
  })
  
  it("yields the index too", function(){
    var indexes = []
    fArr.select([7,8,9,10], function(item, i){
      indexes.push(i)
      return item % 2 == 0
    })
    expect(indexes).toEqual([0,1,2,3])
  })
  
  it("costs the number items in the collection", function(){
    fArr.select([7,8,9,10], function(item){return item % 2 == 0})
    expect(fArr.lastCost()).toEqual(4)
  })

  describe("feature requirements", function(){

    it("requires newCollection, iterator, and append", function(){
      expect(CollectionFunctions({}).functions.
        select).toBeUndefined()
        
      expect(CollectionFunctions({iterator:fArr.iterator}).functions.
        select).toBeUndefined()

      expect(CollectionFunctions({newCollection:function(){return []}, 
                                  iterator:fArr.iterator,
                                  append:function(array, item){array.push(item)}}).functions.
        select).toBeDefined()
    })    

    it("works with newCollection, iterator, and append", function(){
      var fMin = CollectionFunctions({newCollection:function(){return []}, 
                                      iterator:fArr.iterator,
                                      append:function(array, item){array.push(item)}}).functions
      var result = fMin.select([7,8,9,10], function(item){return item % 2 == 0})
      expect(result).toEqual([8,10])
    })    

  })

    

    
})

