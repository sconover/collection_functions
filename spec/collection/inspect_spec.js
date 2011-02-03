require("./spec_helper.js");

describe("inspect", function() {
  
  var fArr = CollectionFunctions.Array.functions
      
  it("calls inspect on each item and prints them in a comma-delimited list", function(){
    var one = {inspect:function(){return "one"}}
    var two = {inspect:function(){return "two"}}
    expect(fArr.inspect([one, two])).toEqual("one,two")
  })
      
  it("outputs the string form of the value if there's no inspect function", function(){
    expect(fArr.inspect([1,2])).toEqual("1,2")
  })

  describe("feature requirements", function(){

    it("requires iterator", function(){
      expect(CollectionFunctions({}).functions.
        inspect).toBeUndefined()
        
      expect(CollectionFunctions({iterator:fArr.iterator}).functions.
        inspect).toBeDefined()
    })    

    it("works with iterator", function(){
      var fMin = CollectionFunctions({iterator:fArr.iterator}).functions
      var one = {inspect:function(){return "one"}}
      var two = {inspect:function(){return "two"}}
      expect(fMin.inspect([one, two])).toEqual("one,two")
    })    

  })
      
})

