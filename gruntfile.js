'use strict';

module.exports = function (grunt) { 
	

	require('jit-grunt')(grunt, {
  	});
    
	// Project configuration.
	grunt.initConfig({
	
		// Import the package.json.
		pkg: grunt.file.readJSON('package.json'),
	
		cfg: {
			// configurable paths
			src: 'src',
			build: '.build'
		}
	});
  	
	grunt.registerTask('default', [
    	// Cleanup generated files.
    	'clean',
		//combine module and service
		'concat',
		//minify combined files
		'uglify'
  	]);

	//load tasks that are in individual files
	grunt.loadTasks('grunt');
};