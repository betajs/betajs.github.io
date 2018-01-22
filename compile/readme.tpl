# The BetaJS Framework


## Abstract

BetaJS is a multi-purpose framework for both NodeJS as well as browser environments.

It is split into separate modules, some of which run in both environments, others only run in either of them.

The main goal of the framework is the support of highly customized large-scale applications.

Here is on overview over all modules included:

| Module | Description |
| :----- | ----------- | <%

	collection.meta.frameworks.forEach(function (framework) {
		
%>
| <%= framework %> | <%=
frameworks[framework].description %> |<%
			
	})

%> 



## Status

The framework is actively maintained, production ready and in production use. The guides and particularly the reference are under construction.


## Basic Usage

<% for (var fkey in frameworks) {
		var framework = frameworks[fkey];
		if (framework.meta.summary) {
%>### <%= fkey %>

<%= framework.meta.summary %>

<% }		
	}

%> 

## Main Contributors

- Oliver Friedmann
- Victor Lingenthal


## Sponsors

- [Ziggeo](https://ziggeo.com), the video API for asynchronous video recording and playback


## License

Licensed under the Apache License, Version 2.0 (the "License"). You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and limitations under the License.
