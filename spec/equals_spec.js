require("./spec_helper.js");

describe("equals", function() {
  
  beforeEach(function(){ this.cf = setupArrayEach() })
      
  xit("is equal if the contents are equal and in matching positions", function(){
    expect(this.cf.equals([7,8,9,10], [7,8,9,10])).toEqual(true)
    
    expect(this.cf.equals([7,8,9,10,10], [7,8,9,10])).toEqual(false)
    expect(this.cf.equals([7,8,9], [7,8,9,10])).toEqual(false)
    
    expect(this.cf.equals([7,8,9,10], [7,8,9,10,10])).toEqual(false)
    expect(this.cf.equals([7,8,9,10], [7,8,9])).toEqual(false)
    
    expect(this.cf.equals([99,8,9,10], [7,8,9,10])).toEqual(false)
  })
      
})

