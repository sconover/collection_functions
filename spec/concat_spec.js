require("./spec_helper.js");

describe("concat", function() {
  
  beforeEach(function(){ this.cf = CollectionFunctions.Array.functions })
      
  it("make a new collection from two collections", function(){
    var result = this.cf.concat([4,5,6], [7,8,9])
    expect(result).toEqual([4,5,6,7,8,9])
  })
  
  it("make a new collection from N collections", function(){
    var result = this.cf.concat([4,5,6], [7,8,9], [10,11])
    expect(result).toEqual([4,5,6,7,8,9,10,11])
  })
  
  it("costs the number items in both collections", function(){
    this.cf.concat([4,5,6], [7,8,9])
    expect(this.cf.lastCost()).toEqual(3)
  })
    
})

