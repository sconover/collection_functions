require("./spec_helper.js");

describe("pluck - a convenient form of map", function() {
  
  beforeEach(function(){ this.cf = setupArrayEach() })
      
  it("for each item, 'plucks' the property name, creating a new array with the results", function(){
    var arr = [{a:1, b:'X'}, {a:2, b:'Y'}, {a:3, b:'Z'}]
    expect(this.cf.pluck(arr, 'a')).toEqual([1,2,3])
    expect(this.cf.pluck(arr, 'b')).toEqual(['X','Y','Z'])
  })

})

