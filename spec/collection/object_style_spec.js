require("./spec_helper.js");

describe("functions are available, method-style, with the target object as the collection", function() {
    
  it("works with a plain object", function(){
    var thing = {array:[]}
    CollectionFunctions.Array.decorateObjectStyle(thing, function(){return this.array})
    
    thing.array.push(1)
    thing.array.push(2)
    var result = thing.map(function(item){return "x" + item})
    expect(result).toEqual(["x1", "x2"])
  })
  
  it("works with a prototype", function(){
    var Thing = function() { this.array = [] }
    CollectionFunctions.Array.decorateObjectStyle(Thing.prototype, function(){return this.array})
    var thing = new Thing()
    
    thing.array.push(1)
    thing.array.push(2)
    var result = thing.map(function(item){return "x" + item})
    expect(result).toEqual(["x1", "x2"])
  })

  it("works with a prototype...returns new collections that are like the decorated object", function(){
    var Thing = function() { this.array = [] }
    
    CollectionFunctions({
      iterator:function(thing) {return CollectionFunctions.Array.functions.iterator(thing.array)}, 
      nothing:function(){return null}, 
      equals:function(a,b){return a==b},
      newCollection:function(){return new Thing()},
      append:function(thing, item){thing.array.push(item)},
      isCollection:function(object){return object.constructor == Thing}
    }).decorateObjectStyle(Thing.prototype, function(){return this})
    
    var thing = new Thing()
    
    thing.array.push(1)
    thing.array.push(2)
    var result = thing.map(function(item){return "x" + item})
    expect(result).toEqual(["x1", "x2"])
    
    var otherThing = new Thing()
    otherThing.array.push(3)
    result = thing.concat(otherThing)
    expect(result.array).toEqual([1,2,3])
  })

  it("expose array cf for convenience", function(){
    var thing = {array:[]}
    CollectionFunctions.Array.decorateObjectStyle(thing, function(){return this.array})
    
    thing.array.push(1)
    thing.array.push(2)
    var result = thing.map(function(item){return "x" + item})
    expect(result).toEqual(["x1", "x2"])
  })
  
})

