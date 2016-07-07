var fs = require("fs"),
    util = require('util')

function allSpecFiles(rootDir) {
  var files = []
  var things = fs.readdirSync(rootDir)
  for (var i=0; i<things.length; i++) {
    var thing = things[i]
    var fullPath = rootDir + "/" + thing
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(allSpecFiles(fullPath))
    } else {
      if (fullPath.match(/\_spec\.js$/)) files.push(fullPath)
    }
  }
  return files
}

var specs = allSpecFiles(".")

var jsScriptSrcLines = []
for(var i=0; i<specs.length; i++) jsScriptSrcLines.push("  <script src='" + specs[i].replace("./spec/", "") + "'></script>")

var template = fs.readFileSync(__dirname + "/browser_suite.html.in", "utf8")
var result = template.replace("<!-- SPECS -->", "\n\n" + jsScriptSrcLines.join("\n") + "\n\n")

fs.writeFile(__dirname + "/browser_suite.html", result, function(err){
  if(err) {
    util.puts(err);
  } else {
    util.puts("");
    util.puts(">> WROTE BROWSER SUITE");
  }
})