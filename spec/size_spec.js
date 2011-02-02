require("./spec_helper.js");

describe("size", function() {
  
  beforeEach(function(){ this.cf = CollectionFunctions.Array.functions })
      
  it("returns the size of the collection", function(){
    var result = this.cf.size([5,6,7,8])
    expect(result).toEqual(4)
  })
  
  describe("cost", function() {
    
    it("cost is N if no length function is supplied", function(){
      // this.minimalArrayCF.appendFeatures({
      //   length
      // })
      // var minimalCF = 
      
      expect(this.cf.size([5,6,7,8])).toEqual(4)
      expect(this.cf.lastCost()).toEqual(4)
    })
    
    xit("cost is constant if a length function is supplied", function(){
      expect(this.cf.size([5,6,7,8])).toEqual(4)
      expect(this.cf.lastCost()).toEqual(0)
    })
    
  })
})

