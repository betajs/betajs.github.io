module.exports = function(grunt) {

	grunt
			.initConfig({
				template : {
					"readme" : {
						options : {
							data : {
								collection: grunt.file.readJSON('package.json'),
								frameworks: {
									"betajs-scoped": grunt.file.readJSON('../betajs-scoped/package.json'),
									"betajs": grunt.file.readJSON('../betajs/package.json'),
									"betajs-browser": grunt.file.readJSON('../betajs-browser/package.json'),
									"betajs-data": grunt.file.readJSON('../betajs-data/package.json'),
									"betajs-ui": grunt.file.readJSON('../betajs-ui/package.json'),
									"betajs-dynamics": grunt.file.readJSON('../betajs-dynamics/package.json'),
									"betajs-flash": grunt.file.readJSON('../betajs-flash/package.json'),
									"betajs-media": grunt.file.readJSON('../betajs-media/package.json')
								}
							}
						},
						files : {
							"README.md" : [ "readme.tpl" ]
						}
					}
				},
				jsdoc : {
					dist : {
						src : [ './README.md', '../betajs/src/base/*.js', '../betajs-browser/src/browser/*.js' ],
						options : {
							destination : '.',
							template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
							configure : "./jsdoc.conf.json",
							tutorials : "../betajs/docsrc/tutorials"
						}
					}
				}
			});

	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-template');
	
	grunt.registerTask('default', ['template:readme', 'jsdoc:dist']);	
	
};