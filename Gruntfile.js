'use strict';

var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
	var config = {
		path: 'app',
		liveReloadPort: 35729
	};

	// load all grunt tasks matching the `grunt-*` pattern
	require('load-grunt-tasks')(grunt);

	require('connect-livereload')({
		port: config.liveReloadPort
	});

	grunt.initConfig({
		conf: config,
		watch: {
            sass: {
                files: [
                    '<%= conf.path %>/assets/sass/*.sass',
                    '<%= conf.path %>/assets/sass/*.scss'
                ],
                tasks: ['compass:dev']
            },
			livereload: {
				options: {
					livereload: config.liveReloadPort
				},
				files: [
					'<%= conf.path %>/*.html',
					'<%= conf.path %>/scripts/*.js',
					'<%= conf.path %>/assets/sass/*.sass'
				]
			}
		},
		compass: {
			dev: {
				options: {
					sassDir: '<%= conf.path %>/assets/sass',
					cssDir: '<%= conf.path %>/assets/css',
					imagesDir: '<%= conf.path %>/assets/images',
					relativeAssets: true,
					outputStyle: 'expanded'
				}
			},
			production: {
				options: {
					sassDir: '<%= conf.path %>/assets/sass',
					cssDir: '<%= conf.path %>/assets/css',
					imagesDir: '<%= conf.path %>/assets/images',
					relativeAssets: true,
					outputStyle: 'compressed',
					environment: 'production'
				}
			}
		},

		connect: {
			options: {
				port: 5555,
				base: config.path,
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							require('connect-livereload')(),
							mountFolder(connect, config.path)
						];
					}
				}
			}
		},
		open: {
			server: {
				url: 'http://localhost:<%= connect.options.port %>'
			}
        }
	});

	grunt.registerTask('default', [
		'connect',
		'open',
		'watch'
	]);
	grunt.registerTask('production', [
		'compass:production',
		'uglify:production'
	]);

	grunt.loadNpmTasks('grunt-open');
};