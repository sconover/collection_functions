require("./spec_helper.js");

describe("layer on stats-tracking capability", function() {
  
  var arrayCF = CollectionFunctions.Array

  it("by default stats are not tracked", function(){
    expect(arrayCF.functions.lastCost).toBeUndefined()
  })

  it("optionally layer on stats tracking", function(){
    expect(arrayCF.withStatTracking.functions.lastCost).toBeDefined()
    expect(arrayCF.appendFeatures({}).withStatTracking.functions.lastCost()).toEqual(0)
  })

  it("lastCost returns the cost of the last external method call", function(){
    var fArrWithStats = arrayCF.withStatTracking.functions
    
    fArrWithStats.each([7,8,9], function(item){/*dont care*/})
    expect(fArrWithStats.lastCost()).toEqual(3)
    expect(fArrWithStats.lastCost()).toEqual(3)
        
    expect(fArrWithStats.select([1,2,3,4,5,6], function(item){return item %2 == 0})).toEqual([2,4,6])
    expect(fArrWithStats.lastCost()).toEqual(6)
    
    fArrWithStats.uniq([7,8,9,10,10,11])
    expect(fArrWithStats.lastCost()).toEqual(20)
  })

  it("totalCost returns the cost of all calls since reset", function(){
    var fArrWithStats = arrayCF.withStatTracking.functions
    fArrWithStats.resetTotalCost()
    expect(fArrWithStats.totalCost()).toEqual(0)
    
    fArrWithStats.each([7,8,9], function(item){/*dont care*/})
    expect(fArrWithStats.totalCost()).toEqual(3)
        
    expect(fArrWithStats.select([1,2,3,4,5,6], function(item){return item %2 == 0})).toEqual([2,4,6])
    expect(fArrWithStats.totalCost()).toEqual(9)
    
    fArrWithStats.resetTotalCost()
    expect(fArrWithStats.totalCost()).toEqual(0)
    
    fArrWithStats.each([7,8,9], function(item){/*dont care*/})
    expect(fArrWithStats.totalCost()).toEqual(3)
  })
})

