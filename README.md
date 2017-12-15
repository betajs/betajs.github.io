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
| betajs-chartjs | BetaJS-ChartJS is a ChartJS Plugin for the BetaJS Framework. |
| betajs-shims | This repository includes shims for ECMA Script that are not included in the official shims. |
| betajs-workers | BetaJS-Workers is a light-weight library for accessing web workers uniformly and conveniently. |
| mock-ajax-server | BetaJS Mock Ajax Server for Testing |
| mock-file-server | BetaJS Mock File Server for Testing |
| betajs-compile | BetaJS-Compile is a helper repository for building betajs modules. | 



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
        element: document.querySelector("some_element"),
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


### betajs-chartjs

The charts module registers a wrapper for the ChartJS via the dynamics system. 
You can instantiate it as follows (is recommendable to read the ChartJS Docs page - http://www.chartjs.org/docs/):


```javascript

	BetaJS.Dynamics.Dynamic.activate();

```


```html

<ba-chart-bars
           ba-title=""
           ba-legend=""
           ba-chartdata=""
           ba-chartlabels=""
           ba-options=""
           ba-randomcolors=""
           ba-customdataobj=""
           >
</ba-chart-bars>


```

There are multiple chart types, each one represented by a different dynamic. The currently supported types are:
  - ba-chart-bars (gives support for horizontal bar chart and mixed charts - bars and line)
  - ba-chart-pie
  - ba-chart-doughnut
  - ba-chart-line
  - ba-chart-polar
  - ba-chart-polar

Each one of these can be implemented with the following partials:
  - ba-title (*object|string*): Title to show on the chart. _false_ by default, can be configured with a string or with a json object with the following format (check more configuration options here http://www.chartjs.org/docs/#chart-configuration-title-configuration):
  ```json
    {
     display: true,
     text: "Title text."
    }
```
  - ba-legend (*object|boolean*): Wether to show the legends or not. Legends can be configured with a json object with the following format (http://www.chartjs.org/docs/#chart-configuration-legend-configuration):
  ```json
{
            display: true,
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            }
        }
```
  - ba-chartdata* (*array*): Array of dataset objects. You can find how to put together a dataset on ChartJS docs. Usually, the minimun required configuration is:
   
   ```json
[{
label: "Dataset",
data: [1, 2, 3, 4, 5]
}]
```
  - ba-chartlabels* (*array*) : Labels for the dataset values. An array of strings with the following format:
  
  ```json
["January", "February", "March", "April"]
```

_*Note: both ba-chartdata and ba-chartlabels are mandatory if ba-customdataobj is null_


  - ba-options (*array*) : A set for chart options. It contains general options, and specific options for each chart type. Refer to ChartJS docs for more info. A small example could be the following:
  
  ```json
{
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
```

  - ba-randomcolors (*boolean*): If you don't want to configure specific colors for each dataset, you love life on multicolor or you just want to drive the user crazy changing chart colors each time the chart refresh, you must set this partial to _true_.
  
  - ba-customdataobj (*object*): A custom chart configuration object. Just put the object on this partial and it will display the chart as you want (No matter which partial you use). The object must contain all of the chart configuration. This is ment to be used for very specific user demands.
  _Important!: all of the other configurations on other partials will be ignored, except for the ba-title and the ba-legend_ . Example, for a line chart:
  
  ```json
{
    type: 'line',
    data: {
        datasets: [{
            label: 'Scatter Dataset',
            data: [{
                x: -10,
                y: 0
            }, {
                x: 0,
                y: 10
            }, {
                x: 10,
                y: 5
            }]
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
}
```
or a bars chart:

```json
{
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
}
```
#### Demos

You can find demos for each dynamic and partial on the demos folder, but I give you a small pie chart example (Remember to load the libraries!):

```html
<ba-chart-pie
		ba-chartdata="{{
            [
                {
                label: 'My example dataset',
                data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
	    }}"
		ba-chartlabels="{{['January', 'February', 'March', 'April', 'May', 'June', 'July']}}"
		ba-randomcolors="{{true}}"
>
</ba-chart-pie>
<script>
BetaJS.Dynamics.Dynamic.activate();
</script>
```

and that previous bar chart using the custom data object:

```html
<ba-chart-pie
		ba-customdataobj="{{{
               type: 'bar',
               data: {
                   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                   datasets: [{
                       label: '# of Votes',
                       data: [12, 19, 3, 5, 2, 3],
                       backgroundColor: [
                           'rgba(255, 99, 132, 0.2)',
                           'rgba(54, 162, 235, 0.2)',
                           'rgba(255, 206, 86, 0.2)',
                           'rgba(75, 192, 192, 0.2)',
                           'rgba(153, 102, 255, 0.2)',
                           'rgba(255, 159, 64, 0.2)'
                       ],
                       borderColor: [
                           'rgba(255,99,132,1)',
                           'rgba(54, 162, 235, 1)',
                           'rgba(255, 206, 86, 1)',
                           'rgba(75, 192, 192, 1)',
                           'rgba(153, 102, 255, 1)',
                           'rgba(255, 159, 64, 1)'
                       ],
                       borderWidth: 1
                   }]
               },
               options: {
                   scales: {
                       yAxes: [{
                           ticks: {
                               beginAtZero:true
                           }
                       }]
                   }
               }
           }}}"
>
</ba-chart-pie>
<script>
BetaJS.Dynamics.Dynamic.activate();
</script>
```
_Note that it doesn't matter if I put a bar chart config on the ba-chart-pie dynamic, as this overrides all of the configs._

### betajs-shims

This library should be used in combination with other shim libraries, particularly:

- [JSON in JavaScript](https://github.com/douglascrockford/JSON-js)


### betajs-workers

This module allows you to communicate with webworkers and to augment webworkers with access to function of the host. Work in progress.

### mock-ajax-server

We'll add more details soon.

### mock-file-server

The server creates the following endpoints:

- GET /files/:filename/size`: returns the size of an uploaded file as json `{"size": size}`
- GET `/files/:filename`: returns an uploaded file as binary stream
- POST `/files/:filename`: stores an uploaded single file with field name `file`
- POST `/chunk/:filename`: stores a single chunk with field name `file` with the chunk number being present in the request body
- POST `/assemble/:filename`: assembles a chunked file, checking the total size with the total size being present in the request body


 

## Main Contributors

- Oliver Friedmann
- Victor Lingenthal


## License

Licensed under the Apache License, Version 2.0 (the "License"). You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and limitations under the License.
