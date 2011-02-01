require("./spec_helper.js");

describe("splice", function() {
  
  beforeEach(function(){ 
    this.thing = []
    arrayEachCf().decorateWithTargetAsCollection(this.thing) 
  })
      
  it("functions are available, method-style, with the target object as the collection", function(){
    this.thing.push(1)
    this.thing.push(2)
    var result = this.thing.map(function(item){return "x" + item})
    expect(result).toEqual(["x1", "x2"])
  })
  
})

