require("./spec_helper.js");

describe("sort", function() {
  
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
  
  it("sorts the collection", function(){
    expect(fArr.sort([5,6,7,8])).toEqual([5,6,7,8])
    expect(fArr.sort([6,5,8,7])).toEqual([5,6,7,8])
    
    expect(fArr.sort([])).toEqual([])
  })
  
  describe("feature requirements", function(){

    it("requires iterator, comparator, newCollection, and append", function(){
      expect(CollectionFunctions({}).functions.
        sort).toBeUndefined()
        
      expect(CollectionFunctions({iterator:fArr.iterator}).functions.
        sort).toBeUndefined()

      expect(CollectionFunctions({iterator:fArr.iterator, 
                                  comparator:numberComparator,
                                  newCollection:function(){return []},
                                  append:function(array, item){array.push(item)}}).functions.
        sort).toBeDefined()
    })    
    
    it("alternatively, a sort feature", function(){
      expect(CollectionFunctions({sort:function(array){ return [].concat(array).sort() }}).functions.
        sort).toBeDefined()
    })
    
    it("works with iterator, comparator, newCollection, and append", function(){
      var fMin = CollectionFunctions({iterator:fArr.iterator, 
                                      comparator:numberComparator,
                                      newCollection:function(){return []},
                                      append:function(array, item){array.push(item)}}).functions
      expect(fMin.sort([6,5,8,7])).toEqual([5,6,7,8])
    })

    it("works with sort feature", function(){
      var fMin = CollectionFunctions({sort:function(array){ return [].concat(array).sort()}}).functions
      expect(fMin.sort([6,5,8,7])).toEqual([5,6,7,8])
    })
    


  })
  
  describe("cost", function() {
    
    it("for now sort cost is 2N, for converting to the array and back.  this is not right, figure out what to do.", function(){      
      var fMin = CollectionFunctions({iterator:fArr.iterator, 
                                      comparator:numberComparator,
                                      newCollection:function(){return []},
                                      append:function(array, item){array.push(item)}}).functions
      expect(fMin.sort([6,5,8,7])).toEqual([5,6,7,8])
      expect(fMin.lastCost()).toEqual(8)
    })
    
    it("if you provide a sort feature the cost is zero", function(){      
      var fMin = CollectionFunctions({sort:function(array){ return [].concat(array).sort()}}).functions
      expect(fMin.sort([6,5,8,7])).toEqual([5,6,7,8])
      expect(fMin.lastCost()).toEqual(0)
    })

    it("the array cf has a sort fearure", function(){      
      fArr.lastCost() //ugh, side effects of cost.  cost is a bit of a mess isn't it.
      expect(fArr.sort([6,5,8,7])).toEqual([5,6,7,8])
      expect(fArr.lastCost()).toEqual(0)
    })
  })
})

