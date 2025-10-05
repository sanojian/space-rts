
module.exports = function (grunt) {

	const defString = grunt.file.read('./src/js/DEFS.js');
	const defStrings = defString.split('\n');
	let version = '0.0.1';
	for (let i = 0; i < defStrings.length; i++) {
		const defs = defStrings[i].split(' ');

		if (defs[0].indexOf('VERSION') != -1) {
			version = defs[1].replaceAll(',', "").replaceAll("'", "");
			break;
		}
	}
	grunt.log.write(version);

	// Load Grunt tasks declared in the package.json file
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({

		watch: {
			scripts: {
				files: [
					'src/js/**/*.js',
					'src/gfx/**/*',
					'dist/lib/*.js',
				],
				tasks: ['build']
			},
			pages: {
				files: [
					'src/html/*.html',
				],
				tasks: ['concat:dev']
			},
		},

		'http-server': {
			dev: {
				root: 'dist',
				port: 3185,
				runInBackground: true
			}
		},

		clean: ['dist/*.html', 'dist/js/'],

		copy: {
			prod: {
				files: [{
					expand: true,
					cwd: 'dist/js/',
					src: ['game.js'],
					dest: 'dist/js/',
					rename: function (dest, src) {
						const names = src.split('.');
						return dest + names[0] + '_' + version + '.js';
					}
				}]
			}
		},

		concat: {
			dev: {
				files: {
					'dist/index.html': [
						'src/html/index_local.html'
					]
				}
			},
			prod: {
				files: {
					'dist/index.html': [
						'src/html/index_prod.html'
					]
				}
			},
			shared: {
				files: {
					'dist/js/game.js': [
						'src/js/DEFS.js',
						'src/js/GLOBAL.js',
						'src/js/DEFS.*.js',
						'src/js/main.js',
						// all parent classes must come first
						'src/js/objects/Ship.js',

						// the rest
						'src/js/**/*.js',

					]
				}
			}
		},
		closureCompiler: {
			options: {
				compilerFile: "node_modules/google-closure-compiler-java/compiler.jar",
				compilerOpts: {
					compilation_level: "SIMPLE_OPTIMIZATIONS",
					language_out: "ECMASCRIPT_2019",
					jscomp_off: "checkVars",
					assume_function_wrapper: true,
				},
			},
			targetName: {
				src: "dist/js/game.js",
				dest: "dist/js/game.js",
			},
		},
		obfuscator: {
			options: {
				banner:
					'/*! Copyright Lax Viking Games <%= grunt.template.today("yyyy") %> - ' +
					'Built <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				/*domainLock: [
					"localhost",
					"127.0.0.1",
					".poki.com", // poki
					".poki-gdn.com", // poki test
					".poki.io", // also poki
					".po.ki", // poki QA tool
					".laxviking.com", // our AWS server
				],
				domainLockRedirectUrl: "https://poki.com",*/
				/*compact: true,
				controlFlowFlattening: false,
				deadCodeInjection: false,
				debugProtection: false,
				debugProtectionInterval: false,
				disableConsoleOutput: false,
				identifierNamesGenerator: "hexadecimal",
				log: false,
				renameGlobals: false,
				rotateStringArray: true,
				selfDefending: true,
				stringArray: false, // changed from high performace settings
				stringArrayEncoding: ["none"],
				stringArrayThreshold: 0.75,
				unicodeEscapeSequence: false,*/
			},
			task1: {
				options: {

				},
				files: {
					'dist/js/game.js': [
						'dist/js/game.js'
					]
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask("cleanOldFile", "clean up old game file", function () {
		grunt.file.delete('dist/js/game.js');

		// version stamp game source file
		let htmlString = grunt.file.read('dist/index.html');
		htmlString += '<script type="text/javascript" src="./js/game_' + version + '.js"></script>';
		grunt.file.delete('dist/index.html');

		grunt.file.write('dist/index.html', htmlString);
		
		// version stamp atlas graphics files
		let atlasString = grunt.file.read('dist/gfx/galactic-smash.json');
		const regex = /\.webp.*"/gi;
		atlasString = atlasString.replaceAll(regex, '.webp?v=' + version + '"');
		grunt.file.write('dist/gfx/galactic-smash.json', atlasString);

	});

	grunt.registerTask('server', [
			'watch:scripts',
			'watch:pages',
		]);

	grunt.registerTask('build', ['clean', 'concat:dev', 'concat:shared']);

	grunt.registerTask('default', ['build', 'http-server', 'server']);
	
	grunt.registerTask('prod', ['clean', 'concat:shared', 'concat:prod', 'obfuscator', 'copy:prod', 'cleanOldFile']);


};