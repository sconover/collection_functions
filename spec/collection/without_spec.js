require("./spec_helper.js");

describe("without", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("returns a new collection without the item", function(){
    var result = fArr.without([7,7,8,9,10,10,11], 10)
    expect(result).toEqual([7,7,8,9,11])
  })

  describe("feature requirements", function(){

    it("requires newCollection, iterator, equals, and append", function(){
      expect(CollectionFunctions({}).functions.
        select).toBeUndefined()
        
      expect(CollectionFunctions({iterator:fArr.iterator}).functions.
        select).toBeUndefined()

      expect(CollectionFunctions({newCollection:function(){return []}, 
                                  iterator:fArr.iterator,
                                  append:function(array, item){array.push(item)},
                                  equals:function(a,b){return a==b}}).functions.
        select).toBeDefined()
    })    

    it("works with newCollection, iterator, and append", function(){
      var fMin = CollectionFunctions({newCollection:function(){return []}, 
                                      iterator:fArr.iterator,
                                      append:function(array, item){array.push(item)},
                                      equals:function(a,b){return a==b}}).functions
      var result = fMin.without([7,7,8,9,10,10,11], 10)
      expect(result).toEqual([7,7,8,9,11])
    })    

  })
    
})

