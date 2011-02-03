require.paths.push("spec")
require.paths.push("lib")

require("../../../jasmine-node/lib/jasmine")

for(var key in jasmine) {
  global[key] = jasmine[key]
}

require("stream_functions")

EOF = "THIS IS THE END"

arrayStream = function(arr) {
  var position = 0
  return function() {
    if (position == arr.length) {
      return EOF
    } else {
      var result = arr[position]
      position += 1
      return result
    }
  }
}