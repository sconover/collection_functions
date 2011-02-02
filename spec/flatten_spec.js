require("./spec_helper.js");

describe("flatten", function() {
  
  beforeEach(function(){ this.cf = CollectionFunctions.Array.functions })
      
  it("takes nested collections and flattens them out", function(){
    var result = this.cf.flatten([1,[2,[3,4]],5,[6,[7]]])
    expect(result).toEqual([1,2,3,4,5,6,7])
  })
  
  it("returns the same collection if there's nothing to do", function(){
    var result = this.cf.flatten([1,2,3,4,5,6,7])
    expect(result).toEqual([1,2,3,4,5,6,7])
  })
    
})

