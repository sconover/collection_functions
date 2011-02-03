require("./spec_helper.js");

describe("is sorted", function() {
  
  var fArr = CollectionFunctions.Array.functions
  var numberComparator = function(a,b){
                           if (a==b) {
                             return 0
                           } else if (a<b) {
                             return 1
                           } else {
                             return -1
                           }
                         }
  
  it("determines whether a collection is sorted or not", function(){
    var fMin = minimalArrayCF().appendFeatures({comparator:numberComparator}).functions
    
    expect(fMin.isSorted([5,6])).toEqual(true)
    expect(fMin.isSorted([5,6,7,8])).toEqual(true)
    expect(fMin.isSorted([5,6,7,7,8])).toEqual(true)
    
    expect(fMin.isSorted([2,3,1])).toEqual(false)
    expect(fMin.isSorted([])).toEqual(true)
    expect(fMin.isSorted([1])).toEqual(true)
  })
  
  describe("feature requirements", function(){

    it("requires iterator and comparator", function(){
      expect(CollectionFunctions({}).functions.
        isSorted).toBeUndefined()
        
      expect(CollectionFunctions({iterator:fArr.iterator}).functions.
        isSorted).toBeUndefined()

      expect(CollectionFunctions({iterator:fArr.iterator, comparator:numberComparator}).functions.
        isSorted).toBeDefined()
    })    

  })
  
  describe("cost", function() {
    
    it("cost is the number of elements in the collection, is the collection is sorted", function(){      
      var fMin = minimalArrayCF().appendFeatures({comparator:numberComparator}).functions
      fMin.isSorted([5,6,7,8])
      expect(fMin.lastCost()).toEqual(4)
    })
    
    it("cost is the number of elements to the first unsorted element, if unsorted", function(){      
      var fMin = minimalArrayCF().appendFeatures({comparator:numberComparator}).functions
      fMin.isSorted([5,7,6,8])
      expect(fMin.lastCost()).toEqual(3)
    })
    
  })
})

