# The BetaJS Framework


## Abstract

BetaJS is a multi-purpose framework for both NodeJS as well as browser environments.

It is split into separate modules, some of which run in both environments, others only run in either of them.

The main goal of the framework is the support of highly customized large-scale applications.

Here is on overview over all modules included:

| Module | Description |
| :----- | ----------- | 
| betajs-scoped | BetaJS-Scoped is a small module for scoped loading of modules and dependencies. |
| betajs | BetaJS is a general-purpose JavaScript helper module. It contains a variety of helper functions and classes. |
| betajs-browser | BetaJS-Browser is a client-side JavaScript framework for Browser-specific methods. |
| betajs-data | BetaJS-Data is a general-purpose JavaScript framework for handling RESTful operations and ActiveRecord abstractions. |
| betajs-server | BetaJS-Server is a server-side JavaScript framework extension for BetaJS. |
| betajs-dynamics | BetaJS-Dynamics is a dynamic DOM templating engine. |
| betajs-ui | BetaJS-UI is a library for enabling gestures and interactions such as drag and drop. |
| betajs-flash | BetaJS-Flash is a Flash-JavaScript bridging framework |
| betajs-media | BetaJS-Media is a JavaScript media framework |
| betajs-media-components | BetaJS-Media-Components is a JavaScript media UI components framework |
| betajs-debug | BetaJS-Debug is a library for debugging BetaJS-based applications. |
| grunt-betajs-templates | Build BetaJS templates. |
| grunt-betajs-docs-compile | Build BetaJS documentations based on JSDOC. |
| betajs-codemirror | BetaJS-Codemirror is a Codemirror Plugin for the BetaJS Framework. |
| betajs-richeditor | BetaJS-Richeditor is a rich editor plugin based on content editable using the BetaJS Framework. | 



## Status

The framework is actively maintained, production ready and in production use. The guides and particularly the reference are under construction.


## Basic Usage

### betajs-scoped

```javascript
(function () {

var Scoped = this.subScope();

Scoped.binding("module", "global:MyLibrary");
Scoped.binding("dependency1", "global:ExternalDependency1");
Scoped.binding("dependency2", "global:ExternalDependency2");

// Library code

}).call(Scoped);
```

```javascript
Scoped.require(['ns1:dependency1', 'ns2:dependency2', 'ns3:dependency3'], function (D1, D2, D3) {
    // Execute once D1, D2, D3 are resolved.
});

Scoped.define('ns:module', ['ns1:dependency1', 'ns2:dependency2', 'ns3:dependency3'], function (D1, D2, D3) {
    // Execute once D1, D2, D3 are resolved.
    return {
        // Return ns:module definition.
    };
});

Scoped.extend('ns:module', ['ns1:dependency1', 'ns2:dependency2', 'ns3:dependency3'], function (D1, D2, D3) {
    // Execute once D1, D2, D3 are resolved.
    return {
        // Return ns:module extension.
    };
});
```

### betajs

The BetaJS module contains a variety of low-level helper libraries, particularly:
- Asynchronous behaviour and Promises
- Object Orientation
- Event Handling
- Dynamic Lists and Collections
- Dynamic Properties
- Remote Method Invocation
- String Manipulation and Templating
- Binary Search Trees
- Timers and Time
- Iterators
- Uris
- State Machine and Abstract Routing

#### Properties

```js

	var properties = new BetaJS.Properties.Properties({foobar: "initial value"});

	properties.set("foobar", "second value");

	var value = properties.get("foobar");
	// value === "second value"
	
	properties.of('change:foobar', function(newValue, oldValue) {
		console.log('The value of foobar has been changed from', oldValue, 'to', newValue);
	});

```


#### Object Orientation

```javascript
  TestClass = BetaJS.Class.extend(null, {
  
    y: 0,
  
    fooBar: function (x) {
      console.log("Test Class Instance", "fooBar", x, y);
    }
    
  }, {
  
    staticFooBar: function (x) {
      console.log("Test Class", "staticFooBar", x);
    }
    
  });
```

```javascript
  TestClass.staticFooBar(5);
  var first = new TestClass();
  first.y = 1;
  first.foobar(2);
  var second = new TestClass();
  second.y = 3;
  second.foobar(4);
```

```
  Test Class  staticFooBar  5
  Test Class Instance  fooBar  2  1
  Test Class Instance  fooBar  4  3
```


#### Events


```javascript
	var events = new BetaJS.Events.Events();

	events.trigger("event_name", event_data1, event_data2);

	events.on("event_name", function (event_arg1, event_arg2) {
		// Do something
	}, function_context);

	events.off("event_name", null, function_context);
```


### betajs-browser

The BetaJS Browser module contains a variety of browser helper libraries, particularly:
- Information about the browser environment at hand
- Ajax
- Cookie Handling
- Flash Embeddings
- Asynchronous Loading of Scripts, Styles and HTML
- Browser Routing
- File / Blob Uploading
- Dom Manipulation
- Dom Mutation Events
- Dom Helper Routines


### betajs-data

The BetaJS Data module contains the following subsystems:
- Query Engine
- Data Store System
- Model / Table System
- Data-based Collections

#### Queries

```javascript
  {
    "gender": "male",
    "age": {
      "$gt": 16
    },
    "first_name": {
      "$sw": "S"
    }
  }
```

```javascript
  evaluate(query, {"gender": "female", ...}) === false
  evaluate(query, {"age": 16, ...}) === false
  evaluate(query, {"first_name": "Guybrush", ...}) === false
  evaluate(query, {"gender": "male", "age": 17, "first_name": "Simon"}) === true
``` 

#### Data Stores

```javascript
   store.insert(instance).success(function (data) {
     // Instance was inserted, and the updated data of instance is data (including the id)
   }).error(function (error) {
     // Could not insert instance
   });
```

```javascript
   store.query(query, constraints).success(function (iterator) {
     // Store was succesfully queried; the query result is an iterator over matched instances.
   }).error(function (error) {
     // Could not execute query
   });
```


#### Modelling

```javascript
   var MyModel = BetaJS.Data.Modelling.Model.extend(null, {
   }, function (inherited) {
        return {
            _initializeScheme: function () {
                var scheme = inherited._initializeScheme.call(this);
                scheme.first_name = {
                    type: "string"
                };
                scheme.last_name = {
                    type: "string"
                };
                return scheme;
           }
        };
   });
```

```javascript
   var myTable = new BetaJS.Data.Modelling.Table(store, MyModel);
```


#### Query Collections

```javascript
   var tableQC = new BetaJS.Data.Collections.TableQueryCollection(table, query, options);
   var storeQC = new BetaJS.Data.Collections.StoreQueryCollection(store, query, options);
```


### betajs-server

The BetaJS Server module contains the following subsystems:
- Database Access and Database Store with Support for MongoDB
- Server-Side AJAX
- Server-Side Session Management


```javascript
	var mongodb = new BetaJS.Server.Databases.MongoDatabase("mongodb://localhost/test-db");
	var store = new BetaJS.Server.Stores.MongoDatabaseStore(mongodb, "test-collection");
	store.insert({x: 5}).success(function (object) {
		console.log(object);
		store.update(object.id, {
			y: 7
		}).success(function (row) {
			console.log(row);
		}, {z: 3});
	});
```


### betajs-dynamics

The Javascript Controller:

```js

    dynamic = new BetaJS.Dynamics.Dynamic({
        element: $("some_element"),
        initial : {
            attrs : {
                some_attribute : "This is some Text",
                some_boolean : true
            }
        }
    });

```

The HTML Element:

```html

    <some_element ba-if="{{some_boolean}}">{{some_attribute}}</some_element>

```

Will evaluate to


```html

    <some_element>This is some Text</some_element>

```


### betajs-ui

```js

    	BetaJS.UI.Interactions.Drag.multiple($(".doodad"), {
            enabled : true,
            clone_element: true
        }, function (drag) {
            drag.on("move", function (event) {
            	event.actionable_modifier.csscls("focus", true);
            	event.modifier.csscls("unfocus", true);
            });
        });
        
```

```html
    	<div class="doodads">
	        <div class="doodad"><div class="inner">Doodad 1</div></div>
	        <div class="doodad"><div class="inner">Doodad 2</div></div>
	        <div class="doodad"><div class="inner">Doodad 3</div></div>
	        <div class="doodad"><div class="inner">Doodad 4</div></div>
	        <div class="doodad"><div class="inner">Doodad 5</div></div>
    	</div>
```


### betajs-flash

```js

	var registry = new BetaJS.Flash.FlashClassRegistry();
	registry.register("flash.media.Video", ["attachNetStream"]);
	registry.register("flash.display.Sprite", ["addChild"]);
	registry.register("flash.net.NetStream", ["play", "addEventListener"]);
	registry.register("flash.net.NetConnection", ["connect", "addEventListener"]);

	var embedding = new BetaJS.Flash.FlashEmbedding($("#embed-here").get(0), {
		registry: registry,
		wrap: true
	}, {
		flashFile: "betajs-flash/dist/betajs-flash.swf"
	});
	
	embedding.ready(function () {
		var main = embedding.flashMain();
		var stage = main.get("stage");
		stage.set("scaleMode", "noScale");
		stage.set("align", "TL");
		var video = embedding.newObject("flash.media.Video", stage.get("stageWidth"), stage.get("stageHeight"));
		main.addChildVoid(video);
		var connection = embedding.newObject("flash.net.NetConnection");
		var cb = embedding.newCallback(function () {
			var stream = embedding.newObject("flash.net.NetStream", connection);
			video.attachNetStreamVoid(stream);
			stream.playVoid("movie.mp4");
		});
		connection.addEventListener("netStatus", cb);
		connection.connectVoid(null);
	});
```

```html

    <div id='embed-here'></div>

```


### betajs-media

```html

	<video></video>

```

```js

    var webrtc = BetaJS.Media.WebRTC.RecorderWrapper.create({
        video: $("video").get(0)
    });
    
```

```html

	<video autoplay loop poster="movie.png">
		<source src="movie.mp4" type="video/mp4" />
	</video>

```

```js

	BetaJS.Media.Player.FlashPlayer.polyfill($("video").get(0)).success(function (video) {
	});

```

### betajs-media-components

```html

	<ba-videoplayer ba-poster="sample-cover.png" ba-source="sample-video.mp4" ba-theme="modern"></ba-videoplayer>
```

```js

	// For fallback
    BetaJS.Flash.options = {
        flashFile: "betajs-flash.swf"
    };
    
    BetaJS.Dynamics.Dynamic.activate();
    
```


### betajs-debug

```js

	var setMethodProfile = BetaJSDebug.Profiler.profilePrototypeMethod("set", BetaJS.Properties.Properties); 
	
    // Code
    
    BetaJSDebug.Hooks.unhookMethod(setMethodProfile.hook);
    
    console.log("Set was called", activateProfile.profile.profile().enterCount, "times.");

```


### grunt-betajs-templates

#### Overview
In your project's Gruntfile, add a section named `betajs_templates` to the data object passed into `grunt.initConfig()`.

#### Options
The namespace of each `betajs_templates` namespace **must** be specified. See
any of the examples for guidance on specifying the namespace option.

```js
grunt.initConfig({
  betajs_templates: {
    dist: {
      files: {
        "dest/betajs-templates.js": [
          "src/my_first_template.html",
          "src/my_second_template.html",
          "src/my_last_templates.html"
        ]
      },
      options: {
        namespace: 'App.Templates'
      }
    },
  },
});
```

Naturally, it is possible to specify a different namespace for each subtask.
Multiple namespaces for different subtasks can be seen in the example below.

```js
grunt.initConfig({
  betajs_templates: {
    dashboard: {
      files: {
        "dest/betajs-dashboard-templates.js": [
          "dashboard/*.html",
        ]
      },
      options: {
        namespace: 'App.Dashboard'
      }
    },
    homepage: {
      files: {
        "dest/betajs-homepage-templates.js": [
          "homepage/*.html"
        ]
      },
      options: {
        namespace: 'App.Homepage'
      }
    }
  }
});
```

### grunt-betajs-docs-compile


```js
		jsdoc : {
			dist : {
				src : sources,
				options : {
					destination : '../',
					template : 'node_modules/grunt-betajs-docs-compile',
					configure : './jsdoc.conf.json',
					tutorials : './tutorials'
				}
			}
		}
```

#### Additional configuration

Additional configuration can be done in the jsdoc.conf.json. It might looks like this:

```js
{
	"tags": {
		"allowUnknownTags": true
	},
	"plugins": ["plugins/markdown"],

	"templates": {
		"cleverLinks": false,
		"monospaceLinks": false,
		"dateFormat": "ddd MMM Do YYYY",
		"outputSourceFiles": true,
		"outputSourcePath": true,
		"systemName": "FooBar",
		"footer": "",
		"copyright": "MIT License",
		"navType": "vertical",
		"theme": "cerulean",
		"linenums": true,
		"collapseSymbols": false,
		"inverseNav": true,
		"highlightTutorialCode": true,
		"protocol": "fred://"
	},
	"markdown": {
		"parser": "gfm",
		"hardwrap": true
	}
}
```

This is mostly preserved and copied from [Ink-Docstrap](https://www.npmjs.com/package/ink-docstrap). Additionally, you can use the following optional arguments:

```js
{
	...
	
	"templates": {
		...
		
		"template": "my/local/template/directory",
        "emptyTutorials": false || true,
        "singleTutorials": false || true,
        "singleModules": false || true
	},

    ...
    
    "pages": {
    	"about": {
    		"title": "About",
    		"source": "./about.md"
    	}
    }
}
```

### betajs-codemirror

```html

		<ba-codemirror ba-trim ba-language='html'>
			<div>
				<h1>H1 None</h1>
				<br />
				<strong>Strong 1</strong> Text 1 <code>Code 1</code><br />
				<code style="text-decoration: underline" >Code 2</code><strong> Strong 2</strong>
				<div style="font-size: 24px; font-family: Helvetica;">Text 2</div>
			</div>
		</ba-codemirror>

```

```javascript

	BetaJS.Dynamics.Dynamic.activate();

```


### betajs-richeditor

```html

		<ba-richeditor>
			<div>
				<h1>H1 None</h1>
				<br />
				<strong>Strong 1</strong> Text 1 <code>Code 1</code><br />
				<u>Code 2</u><strong> Strong 2</strong>
				<div style="font-size: 24px; font-family: Helvetica;">Text 2</div>
			</div>
		</ba-richeditor>
```

```javascript

	BetaJS.Dynamics.Dynamic.activate();

```


 

## Main Contributors

- Oliver Friedmann
- Victor Lingenthal


## Sponsors

- [Ziggeo](http://ziggeo.com), the video API for asynchronous video recording and playback


## License

Licensed under the Apache License, Version 2.0 (the "License"). You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and limitations under the License.
