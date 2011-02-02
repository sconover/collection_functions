require("./spec_helper.js");

describe("pluck - a convenient form of map", function() {
  
  beforeEach(function(){ this.cf = CollectionFunctions.Array.functions })
      
  it("for each item, 'plucks' the property name, creating a new array with the results", function(){
    var arr = [{a:1, b:'X'}, {a:2, b:'Y'}, {a:3, b:'Z'}]
    expect(this.cf.pluck(arr, 'a')).toEqual([1,2,3])
    expect(this.cf.pluck(arr, 'b')).toEqual(['X','Y','Z'])
  })

  it("if there's a function with that name, try to invoke it", function(){
    var arr = [{a:function(){return 1}}, {a:function(){return 2}}, {a:function(){return 3}}]
    expect(this.cf.pluck(arr, 'a')).toEqual([1,2,3])
  })

})

