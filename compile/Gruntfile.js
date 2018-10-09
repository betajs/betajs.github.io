module.exports = function(grunt) {

	var BASE_PATH = "../../";
	var PACKAGE = grunt.file.readJSON('package.json');

	var tutorials = PACKAGE.meta.tutorials.map(function(framework) {
		return {
			expand : true,
			cwd : BASE_PATH + framework + '/docsrc/tutorials',
			src : '*.md',
			dest : './temp'
		};
	});

	var tutorialsMeta = {
		/*"guides": {
			title: "Guides"
		}*/
	};
	PACKAGE.meta.tutorials.forEach(function(framework) {
		tutorialsMeta[framework] = {
			title : framework,
			children : grunt.file.readJSON(BASE_PATH + framework
					+ '/docsrc/tutorials/tutorials.json')
		}
	});

	var frameworks = {};
	var sources = [ '../README.md' ];
	PACKAGE.meta.frameworks.forEach(function(framework) {
		frameworks[framework] = grunt.file.readJSON(BASE_PATH + framework
				+ '/package.json');
		if (frameworks[framework].meta.summarydoc)
			frameworks[framework].meta.summary = grunt.file.read(BASE_PATH + framework + "/" + frameworks[framework].meta.summarydoc);
		sources.push(BASE_PATH + framework + '/src/*.js');
		sources.push(BASE_PATH + framework + '/src/*/*.js');
		sources.push(BASE_PATH + framework + '/src/**/*.js');
	});

	grunt
			.initConfig({
				template : {
					readme : {
						options : {
							data : {
								collection : PACKAGE,
								frameworks : frameworks
							}
						},
						files : {
							'../README.md' : [ 'readme.tpl' ]
						}
					},
					builds : {
						options : {
							data : {
								collection : PACKAGE,
								frameworks : frameworks
							}
						},
						files : {
							'../BUILDS.md' : [ 'builds.tpl' ]
						}
					},
					tutorials : {
						options : {
							data : {
								data : tutorialsMeta
							}
						},
						files : {
							'temp/tutorials.json' : [ 'json.tpl' ]
						}
					},
					guide_overview: {
						options : {
							data : {
								collection : PACKAGE,
								frameworks : frameworks
							}
						},
						files: {
							'temp/guides.md': [ 'guides.tpl' ]
						}
					},
					"jsdoc": {
						options: {
							data: {
								data: {
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
										"systemName": "BetaJS",
										"footer": "Copyright &COPY; " + (new Date()).getFullYear() + " BetaJS / All rights reserved",
										"copyright": "BetaJS (c) - Apache 2.0 License",
										"navType": "vertical",
										"theme": "paper",
										"linenums": true,
										"collapseSymbols": false,
										"inverseNav": true,
										"highlightTutorialCode": true,
										"protocol": "fred://",
										"singleTutorials": true,
										"singleModules": true,
										"copyAssets": false,
										"templates": "./templates",
										"analytics": {
											"ua": "UA-43747442-1",
											"domain": "betajs.com"
										}
									},
									"markdown": {
										"parser": "gfm",
										"hardwrap": true
									},
									"custom": {
										"pkg": PACKAGE,
										"strings": grunt.file.readJSON("strings.json"),
										"frameworks": frameworks
									},
									"pages": {
										"home": {
											"title": "Home",
											"navbar": true,
											"first": true,
											"url": "index.html"
										},
										"blog": {
											"title": "Blog",
											"url": PACKAGE.meta.blog,
											"navbar": true
										},
										"builds": {
											"title": "Builds",
											"navbar": true,
											"first": false,
											"template": "builds"
										}
									}									
								}
							}
						},
						files : {
							"jsdoc.conf.json": ["json.tpl"]
						}
					},
				},
				copy : {
					tutorials : {
						files : tutorials
					},
					assets : {
						files : [{
							expand : true,
							cwd : "./assets",
							src : '**/*',
							dest : '../assets'
						}]				
					}
				},
				clean : [ './temp/*', './jsdoc.conf.json' ],
				jsdoc : {
					dist : {
						src : sources,
						options : {
							destination : '../',
							template : '../../grunt-betajs-docs-compile',
							configure : './jsdoc.conf.json',
							tutorials : './temp'
						}
					}
				}
			});

	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-template');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	grunt.registerTask("tutorial-overview-pages", "Tutorial overview pages", function () {
		PACKAGE.meta.tutorials.forEach(function (framework) {
			var pkg = grunt.file.readJSON(BASE_PATH + framework + '/package.json');
			require("fs").writeFileSync("./temp/" + framework + ".md", pkg.description);
		});
	});

	grunt.registerTask('default', [ 'copy:assets', 'template:readme', 'template:jsdoc', 'copy:tutorials', "template:guide_overview", "tutorial-overview-pages",
			'template:tutorials', 'jsdoc', 'clean' ]);
};
