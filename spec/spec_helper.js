require.paths.push("spec")
require.paths.push("lib")

require("../../jasmine-node/lib/jasmine")

for(var key in jasmine) {
  global[key] = jasmine[key]
}

require("collection_functions")

minimalArrayCF = function(){
  return CollectionFunctions({
    iterator:CollectionFunctions.Array.functions.iterator,
    nothing:function(){return null}
  })
}

