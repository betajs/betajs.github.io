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

	var tutorialsMeta = {};
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
										"footer": "",
										"copyright": "BetaJS (c) - MIT License",
										"navType": "vertical",
										"theme": "cerulean",
										"linenums": true,
										"collapseSymbols": false,
										"inverseNav": true,
										"highlightTutorialCode": true,
										"protocol": "fred://",
										"singleTutorials": true,
										"emptyTutorials": true
									},
									"markdown": {
										"parser": "gfm",
										"hardwrap": true
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
					}
				},
				clean : [ './temp/*', './jsdoc.conf.json' ],
				jsdoc : {
					dist : {
						src : sources,
						options : {
							destination : '../',
							//template : 'node_modules/grunt-betajs-docs-compile',
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

	grunt.registerTask('default', [ 'template:readme', 'template:jsdoc', 'copy:tutorials', "tutorial-overview-pages",
			'template:tutorials', 'jsdoc', 'clean' ]);
};
