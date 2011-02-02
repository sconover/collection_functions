require("./spec_helper.js");

describe("without", function() {
  
  beforeEach(function(){ this.cf = CollectionFunctions.Array.functions })
      
  it("returns a new collection without the item", function(){
    var result = this.cf.without([7,7,8,9,10,10,11], 10)
    expect(result).toEqual([7,7,8,9,11])
  })
    
})

