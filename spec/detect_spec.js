require("./spec_helper.js");

describe("detect", function() {
  
  beforeEach(function(){ this.cf = CollectionFunctions.Array.functions })
      
  it("finds the first match from the collection", function(){
    var result = this.cf.detect([7,8,9], function(item){return item==8 || item==9})
    expect(result).toEqual(8)
  })
  
  it("returns null if there's no match", function(){
    var result = this.cf.detect([7,8,9], function(item){return item==22})
    expect(result).toEqual(null)
  })
  
  it("yields the index alongside the item", function(){
    var indexes = []
    this.cf.detect([7,8,9], function(item, i){
      indexes.push(i)
      return item==8 || item==9
    })
    expect(indexes).toEqual([0,1])
  })
  
  it("costs the number of iterations to the 'hit' (not more)", function(){
    this.cf.detect([7,8,9], function(item){return item==8 || item==9})
    expect(this.cf.lastCost()).toEqual(2)
  })
    
})

