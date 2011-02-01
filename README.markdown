## Jbob

Jbob is a builder for Javascript.

    _ = {};
    Jbob.htmlTags(_);
    
    _.ul(
      _.li("red"),
      _.li("green")
    );
     ==>
       <ul>
       <li>red</li>
       <li>green</li>
       </ul>

Inspired by: 

[Jaml - https://github.com/edspencer/jaml](https://github.com/edspencer/jaml)

[Erector - http://erector.rubyforge.org/userguide.html](http://erector.rubyforge.org/userguide.html)


## Usage

Jbob is a function that takes an array of tag names and adds the equivalent builder functions on to some target object.

    var myObj = {};
    Jbob.apply(myObj, [{tags:["foo", "bar", "helloThere"]}]);
    
    myObj.foo(
      myObj.bar(),
      myObj.helloThere()
    );
     ==>
       <foo>
       <bar/>
       <helloThere/>
       </foo>

You can prevent tags from self-closing.

    var _ = {};
    Jbob.apply(_, [{tags:["foo", "bar"], nonSelfClosingTags:["bar"]}]);
    
    _.foo(
      _.bar()
    );
     ==>
       <foo>
       <bar></bar>
       </foo>


The first parameter to any builder function can be an associative array of attributes.

    var _ = {};
    Jbob.apply(_, [{tags:["foo", "bar"]}]);
    
    _.foo(
      _.bar({x:"y", a:2}, _.foo(), _.foo())
    );
     ==>
       <foo>
       <bar a="2" x="y">
       <foo/>
       <foo/>
       </bar>
       </foo>


Child arrays of builder result strings are acceptable.  This can be useful when transforming and array of one thing into the equivalent array of builder strings.  For example, using underscore.js map:

    var _ = {};
    Jbob.apply(_, [{tags:["ul", "li"]}]);
    
    _.ul(
      _.map(["red", "green"], function(color){return _.li(color)})
    );
     ==>
       <ul>
       <li>red</li>
       <li>green</li>
       </ul>



Jbob has a convenience function that sets up html functions.

    var myObj = {};
    Jbob.htmlTags(myObj);
    
    myObj.div(
      myObj.hr(),
      myObj.br()
    );
    

I prefer to use the underscore object.

    _ = {};
    Jbob.htmlTags(_);
    
    _.ul(
      _.li("red"),
      _.li("green")
    );



## Author ##

Steve Conover <sconover@gmail.com>