require("./spec_helper.js");

describe("to collection", function() {
  
  var fArr = CollectionFunctions.Array.functions
  
  it("converts anything array-like into the collection type", function(){    
    var foo = function() {
      var array = fArr.toCollection(arguments)
      expect(array).toEqual([7,8,9])
      
      array.push(10)
      expect(array).toEqual([7,8,9,10])
      
      expect(array.slice).toBeDefined()
    }
    
    foo(7,8,9)
  })
  
  it("you can provide your own iterator", function(){    
    
    var twoDIterator = function(twoDArray){
      var position = 0
      return {
        hasNext:function(){return position<twoDArray.length},
        next:function(){
          var item = twoDArray[position][1]
          position += 1
          return item
        }
      } 
    }
    
    expect(fArr.toCollection([[1,7],[2,8],[3,9]], twoDIterator)).toEqual([7,8,9])
  })
  
  describe("feature requirements", function(){

    it("requires iterator, newCollection, and append", function(){
      expect(CollectionFunctions({}).functions.
        toCollection).toBeUndefined()
        
      expect(CollectionFunctions({newCollection:function(){return []}}).functions.
        toCollection).toBeUndefined()

      expect(CollectionFunctions({newCollection:function(){return []},
                                  append:function(array, item){array.push(item)}}).functions.
        toCollection).toBeDefined()
    })    
    
    it("works with iterator, newCollection, and append", function(){
      var fMin = CollectionFunctions({newCollection:function(){return []},
                                      append:function(array, item){array.push(item)}}).functions
      expect(fMin.toCollection([7,8,9])).toEqual([7,8,9])
    })

  })
  
})

