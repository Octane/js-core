# The project moved to https://github.com/Octane/jsCore/ #

<table border='0'><tr><td valign='top'><img src='http://js-core.googlecode.com/svn/trunk/doc/logo.png' />
<ul><li>version: 2.8.1<br>
</li><li>date: 2009.06.13</td><td>
<h2>Advantages</h2>
</li><li>Fast and lightweight<br>
</li><li>Cross-browser (IE6+, FF2+, Opera 9+, Safari 3+)<br>
</li><li>Support <code>DOMContentLoaded</code>
</li><li>Caching for <code>document.getElementById('id')</code>
</li><li>Support AJAX (<a href='http://code.google.com/p/js-core/downloads/detail?name=js-core.ajax.0.2.7.zip'>external module</a>)<br>
</li><li>Easy to learn<br>
<h2>In future we will add</h2>
</li><li>Animation (<code>fadeIn</code>, <code>fadeOut</code>, <code>slideToggle</code>)<br>
</li><li>Processing XHTML-forms</td></tr></table></li></ul>

## How to use ##
  1. Add js-core to document
```
<script type="text/javascript" src="js-core.js"></script>
```
  1. Place your script after
  1. Work with DOM-elements after the event `DOMContentLoaded`
```
$.ready(function() {

  // for example: append heading level 1
  // with green text 'Hello World!'

  $(document.body)
      .append("h1")
          .text("Hello World!")
              .css("color", "green");

});
```
For more information, see [examples](http://js-core.googlecode.com/svn/trunk/index.html) and [documentation](http://js-core.googlecode.com/svn/trunk/doc/index.html).

Improve your JavaScript skills, [read ECMA-262](http://dmitrysoshnikov.com/) by Dmitry A. Soshnikov.
