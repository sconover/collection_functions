require("./spec_helper.js");

describe("across - put together multiple collections and use most cf capabilities", function() {
  
  beforeEach(function(){ this.cf = setupArrayEach() })
      
  describe("across each", function() {
    it("yields slices across collections.  it's like zip given a callback, but yields the whole entry collection", function(){
      var results = []
      this.cf.across([1,2,3], [4,5,6], [7,8,9]).each(function(entry, i){
        results.push([entry[0], entry[1], entry[2], i])
      })
      expect(results).toEqual([
        [1,4,7, 0],
        [2,5,8, 1],
        [3,6,9, 2]
      ])
    })
  })
      
})

