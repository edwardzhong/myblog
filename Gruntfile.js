var path=require('path');
module.exports=function(grunt){
	require('load-grunt-tasks')(grunt);//加载所有的任务
	require('time-grunt')(grunt); //使用 time-grunt 插件
	var dirs={
			app: 'public',
			dist: 'dist',
			test:'test',
			tmp:'.tmp',
			view:'public/views'
		};
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dirs: dirs,
		//Banner for top of concatenated CSS and Javascript
		meta: {
			banner: '/**\n' +
				' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
				' *\n' +
				' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
				' */\n'
		},
		//通过express插件配置服务器
		express: {
			dev: {
				options: {
					script: 'app.js',
					node_env: 'development'
				}
			}
		},
        //监控部分
		watch:{
			express: {
			files:  [ '<%= dirs.app %>/js/{,*/}*.js',
					'<%= dirs.app %>/styles/{,*/}*.css',
					'<%= dirs.view %>/{,*/}*.html',
					'daos/{,*/}*.js',
					'routes/{,*/}*.js',
					'models/{,*/}*.js',
					'app.js','log.js'],
			tasks:  [ 'express:dev' ],
			options: {
				spawn: true // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
			}
		},
			// livereload: {
			// 	options: {
			// 		livereload: true
			// 	},
			// 	files:[ 
			// 		'daos/{,*/}*.js',
			// 		'routes/{,*/}*.js',
			// 		'models/{,*/}*.js',
			// 		'app.js','log.js'
			// 		]
	  //     	},
			js:{
				files: ['<%= dirs.app %>/js/{,*/}*.js'],
				tasks: ['jshint'],
				options: {
					livereload:true
				}
			},
			// less:{
			// 	files:['<%= dirs.app %>/styles/{,*/}*.less'],
			// 	tasks:['less:app']
			// },
			css:{
				files:['<%= dirs.app %>/styles/{,*/}*.css'],
				tasks:['newer:copy:styles','autoprefixer']
			}
		},
		// 清空指定目录
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'<%= dirs.tmp %>',
						'<%= dirs.dist %>/*',
						'!<%= dirs.dist %>/.git*'
					]
				}]
			},
			server: '<%= dirs.tmp %>'
		},
        // 增加css前缀
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
				expand: true,
				flatten: true,
				src: '<%= dirs.tmp %>/styles/{,*/}*.css',
				dest: '<%= dirs.tmp %>/styles/'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= dirs.app %>/js/{,*/}*.js',
                '<%= dirs.test %>/spec/{,*/}*.js'
            ]
        },
		// less: {
		// 	app: {
		// 		options: {
		// 			paths: ['<%= dirs.app %>/styles']
		// 		},
		// 		files: {
		// 			"index.css": "index.less"
		// 		}
		// 	},
		// 	dist: {
		// 		options: {
		// 			paths: ["<%= dirs.dist %>/styles"],
		// 			cleancss: true
		// 		},
		// 		files: {
		// 			"index.css": "index.less"
		// 		}
		// 	}
		// },
		//重命名文件 增加前缀
		rev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 8
			},
			dist: {
				files: [{
					src: [
						'<%= dirs.dist %>/js/{,*/}*.js',
						'<%= dirs.dist %>/styles/{,*/}*.css',
						'<%= dirs.dist %>/images/{,*/}*.*'
					]
				}]
			}
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= dirs.app %>/images',//源目录
					src: '{,*/}*.{gif,jpeg,jpg,png}',//匹配的文件
					dest: '<%= dirs.dist %>/images'//压缩后存放的目录
				}]
			}
		},
		htmlmin: {
			dist: {
				options: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeCommentsFromCDATA: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true,
					removeRedundantAttributes: true,
					useShortDoctype: true
				},
				files: [{
					expand: true,
					cwd: '<%= dirs.view %>',
					src: '**/*.html',//该目录下所有html文件
					dest: '<%= dirs.dist %>/views'
				}]
			}
		},
		//usemin已经包含了以下3个插件功能
		cssmin: {
			dist: {
				options: {
					banner: '<%= meta.banner %>'
				},
				files: {
					'<%= dirs.dist %>/styles/app.css':
					['<%= dirs.tmp %>/styles/{,*/}*.css','<%= dirs.app %>/styles/{,*/}*.css']
				}
			}
		},
		uglify: {
			options: {
				banner: '<%= meta.banner %>'
			},
			dist: {
				files: {
					'<%= dirs.dist %>/js/app.min.js':[
						'<%= dirs.dist %>/js/app.js'
					]
				}
			}
		},
		concat: {
			dist: {
				files: {
					'<%= dirs.dist %>/js/app.js':[
						'<%= dirs.dist %>/js/base.js','<%= dirs.dist %>/js/index.js'
					]
				}
			},
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= dirs.app %>',
					dest: '<%= dirs.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'images/{,*/}*.webp',
						'{,*/}*.html',
						'styles/fonts/{,*/}*.*'
					]
				}, {
					expand: true,
					dot: true,
					cwd: 'libs/bootstrap/dist',
					src: ['fonts/*.*'],
					dest: '<%= dirs.dist %>'
				}]
			},
			styles: {
				expand: true,
				dot: true,
				cwd: '<%= dirs.app %>/styles',
				dest: '<%= dirs.tmp %>/styles/',
				src: '{,*/}*.css'
			}
		},
		// 并行任务
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'imagemin'
            ]
        }
	});

	//启动静态服务器,自动监控变化
    grunt.registerTask('serve',  function (target) {
        // if (target === 'dist') {
        //     return grunt.task.run(['build', 'express:dist:keepalive']);
        // }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'express:dev',
            'watch'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    //测试
	// grunt.registerTask('test', function (target) {
	// 	if (target !== 'watch') {
	// 		grunt.task.run([
	// 			'clean:server',
	// 			'concurrent:test',
	// 			'autoprefixer'
	// 		]);
	// 	}

	// 	grunt.task.run([
	// 		'connect:test',
	// 		'jasmine'
	// 	]);
	// });

	//构建项目
    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'htmlmin'
    ]);

    //默认 测试后构建项目
    grunt.registerTask('default', [
        'build'
    ]);
};