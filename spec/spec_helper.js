require.paths.push("spec")
require.paths.push("lib")

require("../../jasmine-node/lib/jasmine")

for(var key in jasmine) {
  global[key] = jasmine[key]
}

require("collection_functions")

