require("./spec_helper.js");

describe("concat", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("make a new collection from two collections", function(){
    var result = fArr.concat([4,5,6], [7,8,9])
    expect(result).toEqual([4,5,6,7,8,9])
  })
  
  it("make a new collection from N collections", function(){
    var result = fArr.concat([4,5,6], [7,8,9], [10,11])
    expect(result).toEqual([4,5,6,7,8,9,10,11])
  })
  
  describe("cost", function(){

    it("by default we traverse through the elements in each collection and append to a new collection", function(){
      var fMin = minimalArrayCF().appendFeatures({
        newCollection:function(){return []},
        append:function(array, item){array.push(item)}
      }).functions
      expect(fMin.concat([4,5,6], [7,8,9], [10,11])).toEqual([4,5,6,7,8,9,10,11])
      expect(fMin.lastCost()).toEqual(8)
    })
    
    it("is zero cost if you specify a concat feature", function(){
      var fMin = minimalArrayCF().appendFeatures({
        newCollection:function(){return []},
        append:function(array, item){array.push(item)},
        concat:function(){
          var firstArray = arguments[0]
          var otherArrays = []
          for(var i=1; i<arguments.length; i++) {otherArrays[i-1] = arguments[i]}
          return firstArray.concat.apply(firstArray, otherArrays)
        }
      }).functions
      expect(fMin.concat([4,5,6], [7,8,9], [10,11])).toEqual([4,5,6,7,8,9,10,11])
      expect(fMin.lastCost()).toEqual(0)
    })
    
    it("default array cf specifies a concat feature and is therefore zero cost", function(){
      expect(fArr.concat([4,5,6], [7,8,9], [10,11])).toEqual([4,5,6,7,8,9,10,11])
      expect(fArr.lastCost()).toEqual(0)
    })
    
  })
    
})

