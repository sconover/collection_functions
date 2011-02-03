require("./spec_helper.js");

describe("all", function() {
  
  var fArr = CollectionFunctions.Array.functions
  
  it("returns all members of the collection in a new collection wrapper", function(){
    var original = [7,8,9]
    var results = fArr.all(original)
    expect(results).toEqual(original)
    
    original.push(999)
    expect(results).toEqual([7,8,9])
  })
  
  describe("feature requirements", function(){

    it("requires newCollection and append features if you don't have a concat feature", function(){
      expect(CollectionFunctions({}).functions.
        all).toBeUndefined()
        
      expect(CollectionFunctions({newCollection:function(){return []}}).functions.
        all).toBeUndefined()

      expect(CollectionFunctions({newCollection:function(){return []}, 
                                  append:function(array, item){array.push(item)}}).functions.
        all).toBeDefined()
    })    

    it("is available if you supply a concat features", function(){
      expect(CollectionFunctions({}).functions.
        all).toBeUndefined()

      expect(
        CollectionFunctions({concat:function(){
                              var firstArray = arguments[0]
                              var otherArrays = []
                              for(var i=1; i<arguments.length; i++) {otherArrays[i-1] = arguments[i]}
                              return firstArray.concat.apply(firstArray, otherArrays)
                            }}).functions.
        all).toBeDefined()
    })    

  })
  
  
  describe("cost", function(){
    it("is N if no concat feature is specified", function(){
      var fMin = minimalArrayCF().appendFeatures({
        newCollection:function(){return []},
        append:function(array, item){array.push(item)}
      }).withStatTracking.functions
      expect(fMin.all([7,8,9])).toEqual([7,8,9])
      expect(fMin.lastCost()).toEqual(3)
    })

    it("is zero if concat feature is specified", function(){
      var fMin = minimalArrayCF().appendFeatures({
        concat:function(){
          var firstArray = arguments[0]
          var otherArrays = []
          for(var i=1; i<arguments.length; i++) {otherArrays[i-1] = arguments[i]}
          return firstArray.concat.apply(firstArray, otherArrays)
        }
      }).withStatTracking.functions
      
      expect(fMin.all([7,8,9])).toEqual([7,8,9])
      expect(fMin.lastCost()).toEqual(0)
    })

    it("array cf has the concat feature specified and therefore is zero-cost", function(){
      var fArrWithStats = CollectionFunctions.Array.withStatTracking.functions
      
      expect(fArrWithStats.all([7,8,9])).toEqual([7,8,9])
      expect(fArrWithStats.lastCost()).toEqual(0)
    })
  })
  
  
})

