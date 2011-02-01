require("./spec_helper.js");

describe("functions are available, method-style, with the target object as the collection", function() {
    
  it("works with a plain object", function(){
    var thing = {array:[]}
    arrayEachCf().decorateObjectStyle(thing, function(){return this.array})
    
    thing.array.push(1)
    thing.array.push(2)
    var result = thing.map(function(item){return "x" + item})
    expect(result).toEqual(["x1", "x2"])
  })
  
  it("works with a prototype", function(){
    var Thing = function() { this.array = [] }
    arrayEachCf().decorateObjectStyle(Thing.prototype, function(){return this.array})
    var thing = new Thing()
    
    thing.array.push(1)
    thing.array.push(2)
    var result = thing.map(function(item){return "x" + item})
    expect(result).toEqual(["x1", "x2"])
  })
  
})

