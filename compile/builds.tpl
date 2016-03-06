# Builds

<%

		var mapper = function (deps) {
			var result = [];
			if (deps) {
				for (var key in deps)
					result.push("[" + key + "](" + deps[key] + ")");
			}
			return result.join(", ");
		};
		
%>



## Overview

The framework contains the following modules:

| Module | Description | Version |
| :----- | ----------- | ------: |<%

	for (var fkey in frameworks) {
		var framework = frameworks[fkey];
		
%>
| [<%= fkey %>](<%= framework.repository.url.replace("git://", "http://").replace(".git", "") %>) | <%=
framework.description %> | <%= framework.version %> |<%
			
	}

%> 







## Downloads

| Module | Downloads |
| :----- | --------: |<%

	for (var fkey in frameworks) {
		var framework = frameworks[fkey];
		
%>
| [<%= fkey %>](<%= framework.repository.url.replace("git://", "http://").replace(".git", "") %>) | <%= mapper(framework.meta.cdn) %> |<%
	}

%> 




## Tests

| Module | Tests | Travis | Codeclimate | NPM |
| :----- | ----- | ------ | ----------- | --: |<%

	for (var fkey in frameworks) {
		var framework = frameworks[fkey];
		
%>
| [<%= fkey %>](<%= framework.repository.url.replace("git://", "http://").replace(".git", "") %>) | <%=
mapper(framework.meta.tests) %> | <%
if (framework.meta.badges.travis) { %>[![Build Status](https://api.travis-ci.org/betajs/<%= framework.name %>.svg?branch=master)](https://travis-ci.org/betajs/<%= framework.name %>)<% } %> | <%
if (framework.meta.badges.codeclimate) { %>[![Code Climate](https://codeclimate.com/github/betajs/<%= framework.name %>/badges/gpa.svg)](https://codeclimate.com/github/betajs/<%= framework.name %>)<% } %> | <%
if (framework.meta.badges.npm) { %>[![npm version](https://img.shields.io/npm/v/<%= framework.name %>.svg?style=flat)](https://www.npmjs.com/package/<%= framework.name %>)<% } %> |<%
			
	}

%> 



## Compatability

The software has been tested to operate properly in the following environments:

<%
	var compatability = {
		"nodejs": "NodeJS",
		"chrome": "Chrome",
		"firefox": "Firefox",
		"safari": "Safari",
		"opera": "Opera",
		"internet explorer": "Internet Explorer",
		"edge": "Edge",
		"ios": "iOS",
		"android": "Android"		
	};
%>
| Module |<%

	for (var key in compatability) {
	
%> <%= compatability[key] %> |<%

	}

%>
| :----- | ------ | ------ | ------- | ------ | ----- | -- | ---- | --- | ------: |<%

	for (var fkey in frameworks) {
		var framework = frameworks[fkey];
		
%>
| [<%= fkey %>](<%= framework.repository.url.replace("git://", "http://").replace(".git", "") %>) |<%

		for (var ckey in compatability) {
			var found = false;
			for (var cckey in framework.meta.compatability) {
				if (cckey.toLowerCase() === ckey) {

%> <%= framework.meta.compatability[cckey] %> |<%

					found = true;
					break;
				}
			}
			if (!found) {

%> - |<%
			
}			
		} 
	}

%> 




## Dependencies


The single packages have the following dependencies:

| Module | Dependencies | Weak Dependencies |
| :----- | ------------ | ----------------: |<%

	for (var fkey in frameworks) {
		var framework = frameworks[fkey];
		
%>
| [<%= fkey %>](<%= framework.repository.url.replace("git://", "http://").replace(".git", "") %>) | <%= mapper(framework.meta.dependencies) %> | <%= mapper(framework.meta.weakDependencies) %> |<%
			
	}

%> 



## Credits

This software may include modified and unmodified portions of:

| Module | Credit |
| :----- | -----: |<%

	for (var fkey in frameworks) {
		var framework = frameworks[fkey];
		if (framework.meta.credits) {
			framework.meta.credits.forEach(function (credit) { 
			
%>
| [<%= fkey %>](<%= framework.repository.url.replace("git://", "http://").replace(".git", "") %>) | <%= credit %> |<%
			
			});			
		} 
	}

%> 



## Contributors

This software is mainly maintained by:

| Module | Contributors |
| :----- | -----: |<%

	for (var fkey in frameworks) {
		var framework = frameworks[fkey];
		
%>
| [<%= fkey %>](<%= framework.repository.url.replace("git://", "http://").replace(".git", "") %>) | <%= framework.contributors.join(", ") %> |<%
			
	}

%> 




## License

Licensed under the Apache License, Version 2.0 (the "License"). You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and limitations under the License.