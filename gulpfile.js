'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    fs = require('fs'),
    merge = require('merge2'),
    paths = require('path'),
    source = require('vinyl-source-stream'),
    jspm = require('jspm'),
    moduleImporter = require('sass-module-importer'),
    browserSync = require('browser-sync').create();

var tsProject = plugins.typescript.createProject('tsconfig.json');
var autoprefixerSettings = require('./config/autoprefixer-settings.js');
var packageJSON = JSON.parse(fs.readFileSync('package.json'));

gulp.task('compile', ['install-typings', 'sass', 'ts', 'html']);

gulp.task('install-typings', function () {
    gulp.src('./typings.json')
        .pipe(plugins.typings());
});

gulp.task('serve', ['compile'], function () {

    browserSync.init({
        server: {
            baseDir: '.',
            routes: {
                '/node_modules': 'node_modules',
                '/jspm_packages': 'jspm_packages',
                '/jspm.config.js': 'jspm.config.js',
            }
        }
    });

    gulp.watch('./src/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.ts', ['ts']);
    gulp.watch('./src/**/*.html', ['html']);
    gulp.watch('./public/**/*.css').on("change", browserSync.reload);
});

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.stream());
});

gulp.task('ts', function () {
    var tsResult = tsProject.src()
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.typescript(tsProject));

    return tsResult.js
        .pipe(plugins.sourcemaps.write('.', { sourceRoot: '/../src' }))
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.stream());
});

gulp.task('sass', function () {
    return gulp.src('./src/**/*.scss')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            /*importer: moduleImporter(),*/
            includePaths: [
                'src/',
                'node_modules/'
            ]
        }).on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer(autoprefixerSettings))
        .pipe(plugins.sourcemaps.write('.', { sourceRoot: '/../src' }))
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.stream());
});

gulp.task('release:patch', function () {
    return gulp.src('./package.json')
        .pipe(plugins.bump({ type: 'patch' }))
        .pipe(gulp.dest('./'))
        .pipe(plugins.git.commit('bump package version'))
        .pipe(plugins.filter('package.json'))
        .pipe(plugins.tagVersion());
});

gulp.task('build', ['build:ts'], function () {
    // jspm.setPackagePath('.');

    // var builder = new jspm.Builder();
    // builder.config({
    //     paths: {
    //         "github:*": "./jspm_packages/github/*",
    //         "npm:*": "./jspm_packages/npm/*",
    //         "app": "build"
    //     },
    //     packages: {
    //         "app": {
    //             "main": "shared.lib",
    //             "defaultExtension": "js"
    //         }
    //     }
    // });

    // builder.buildStatic('app', 'build/app.min@' + packageJSON.version + '.js', {
    //     minify: false,
    //     mangle: false,
    //     inject: false,
    //     sourceMaps: false,
    //     globalDefs: { DEBUG: false }
    // }).then(function (output) {
    //     //gulp.src('build/app', { read: false }).pipe(plugins.clean());
    // });

    gulp.src([
        'build/test.js',
        'build/test.d.ts'
    ], { read: false }).pipe(plugins.clean());

    return gulp.src('./package.json')
        .pipe(plugins.replace(/\"devDependencies\":\s{[^}]+},/g, "\"devDependencies\": {},"))
        .pipe(plugins.replace(/\"dependencies\":\s{[^}]+},/g, "\"dependencies\": {}"))
        .pipe(plugins.replace(/\"jspm\":\s{([^}]+[^,])*}/g, ""))
        .pipe(gulp.dest('./build/'));

});

gulp.task('build:ts', ['sass'], function () {
    var tsResult = tsProject.src()
        .pipe(plugins.inlineNg2Template({
            base: '/src',
            useRelativePaths: true,
            removeLineBreaks: true,
            customFilePath: function (path) {
                if (path.indexOf('.css', path.length - '.css'.length) !== -1) {
                    return path.replace('/src/', '/public/');
                }
                return path;
            }
        })).pipe(plugins.typescript(tsProject));

    //return tsResult.js.pipe(gulp.dest('./build'));

    return merge([
        tsResult.js.pipe(gulp.dest('./build')),
        tsResult.dts.pipe(gulp.dest('./build'))
    ]);
});

// gulp.task('build:html', function () {
//     return gulp.src('index.html')
//         .pipe(plugins.htmlReplace({
//             'js': '',
//             'prod': 'app.min@' + packageJSON.version + '.js'
//         }))
//         .pipe(gulp.dest('./build'));
// });