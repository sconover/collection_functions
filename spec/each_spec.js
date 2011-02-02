require("./spec_helper.js");

describe("each, cost", function() {
  
  beforeEach(function(){ this.cf = CollectionFunctions.Array.functions })
  
  it("yields each member of the collection", function(){
    var results = []
    this.cf.each([7,8,9], function(item){results.push(item)})
    expect(results).toEqual([7,8,9])
  })
  
  it("yields the index alongside the item", function(){
    var indexes = []
    this.cf.each([7,8,9], function(item, i){indexes.push(i)})
    expect(indexes).toEqual([0,1,2])
  })
  
  it("stores information about cost.  cost is the number of items iterated through.", function(){
    this.cf.each([7,8,9], function(item, i){})
    expect(this.cf.lastCost()).toEqual(3)
  })
})

