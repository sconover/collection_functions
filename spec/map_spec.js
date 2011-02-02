require("./spec_helper.js");

describe("map", function() {
  
  beforeEach(function(){ this.cf = CollectionFunctions.Array.functions })
      
  it("using the transformer function, convert each item of the collection and return as a new collection", function(){
    var result = this.cf.map([7,8,9], function(item){return "x" + item})
    expect(result).toEqual(["x7", "x8", "x9"])
  })
  
  it("use the supplied new collection and append to collection methods if supplied", function(){
    var newCollection = function(){return {}}
    var appender = function(collection, item){collection[item] = item}
    var result = this.cf.map([7,8,9], function(item){return "x" + item}, newCollection, appender)
    expect(result).toEqual({x7:"x7", x8:"x8", x9:"x9"})
  })
  
  it("yields the index too", function(){
    var indexes = []
    this.cf.map([7,8,9], function(item, i){
      indexes.push(i)
      return "x" + item
    })
    expect(indexes).toEqual([0,1,2])
  })
  
  it("costs the number items in the collection", function(){
    this.cf.map([7,8,9], function(item){return "x" + item})
    expect(this.cf.lastCost()).toEqual(3)
  })
    
})

