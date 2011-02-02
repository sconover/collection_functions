require("./spec_helper.js");

describe("select", function() {
  
  beforeEach(function(){ this.cf = CollectionFunctions.Array.functions })
      
  it("takes the matching members of the old collection and makes a new collection", function(){
    var result = this.cf.select([7,8,9,10], function(item){return item % 2 == 0})
    expect(result).toEqual([8,10])
  })
  
  it("returns an empty collection if there are no matches", function(){
    var result = this.cf.select([7,8,9,10], function(item){return item % 77 == 0})
    expect(result).toEqual([])
  })
  
  it("yields the index too", function(){
    var indexes = []
    this.cf.select([7,8,9,10], function(item, i){
      indexes.push(i)
      return item % 2 == 0
    })
    expect(indexes).toEqual([0,1,2,3])
  })
  
  it("costs the number items in the collection", function(){
    this.cf.select([7,8,9,10], function(item){return item % 2 == 0})
    expect(this.cf.lastCost()).toEqual(4)
  })
    
})

