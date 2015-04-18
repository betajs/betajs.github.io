module.exports = function(grunt) {

	grunt
			.initConfig({
				template : {
					"readme" : {
						options : {
							data : {
								collection: grunt.file.readJSON('package.json'),
								frameworks: {
									betajs: grunt.file.readJSON('../betajs/package.json')
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
						src : [ './README.md', '../betajs/src/base/*.js' ],
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