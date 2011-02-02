require("./spec_helper.js");

describe("clone", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("shallow-copy a collection", function(){
    var obj = {a:1}
    var original = [1, obj, 2]
    var result = fArr.clone(original)
    expect(result).toEqual([1, obj, 2])
    
    original.push(3)
    expect(result).toEqual([1, obj, 2])
    
    obj.a = 99
    expect(result).toEqual([1, obj, 2])
  })
    
  describe("feature requirements", function(){

    it("requires a newCollection feature if you don't have a concat feature", function(){
      var fMin = minimalArrayCF().functions
      var attemptClone = function(){fMin.clone([4,5,6])}
      expect(attemptClone).toThrow("Feature 'newCollection' is required in order to perform this operation.")
    })    
    
    it("requires an append feature if you don't have a concat feature", function(){
      var fMin = minimalArrayCF().appendFeatures({
        newCollection:function(){return []}
      }).functions
      var attemptClone = function(){fMin.clone([4,5,6])}
      expect(attemptClone).toThrow("Feature 'append' is required in order to perform this operation.")
    })    
    
    it("if you supply a concat feature you don't need to also supply newCollection", function(){
      expect(fArr.clone([4,5,6])).toEqual([4,5,6])
    })    
    
  })
  
    
  describe("cost", function(){
    it("is N if no concat feature is specified", function(){
      var fMin = minimalArrayCF().appendFeatures({
        newCollection:function(){return []},
        append:function(array, item){array.push(item)}
      }).functions
      var original = [7,8,9]
      var clone = fMin.clone(original)
      expect(clone).toEqual([7,8,9])
      original.push(999)
      expect(clone).toEqual([7,8,9])
      
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
      }).functions
      
      expect(fMin.clone([7,8,9])).toEqual([7,8,9])
      expect(fMin.lastCost()).toEqual(0)
    })

    it("array cf has the concat feature specified and therefore is zero-cost", function(){
      expect(fArr.clone([7,8,9])).toEqual([7,8,9])
      expect(fArr.lastCost()).toEqual(0)
    })
  })
  
})

