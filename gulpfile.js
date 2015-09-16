var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer')
;

var vendors = {
    bootstrap: {
        base: './node_modules/bootstrap',
        less_files_top: './node_modules/bootstrap/less/*.less',
        less_files_descendents: './node_modules/bootstrap/less/**/*.less',
        less_variables: './node_modules/bootstrap/less/variables.less',
        fonts: './node_modules/bootstrap/fonts/*.*'
    }
};    

var app =  {
    less: {
        /* 
         * base contains variables.less (bootstrap) & other custom styles for the app
         */
        base: './less',
        style: './less/style.less',
        bootstrap: {
            variables: './less/variables.less',
            dist: './less/bootstrap'
        },
    },
    css: {
        base: './static/css',
        bootstrap: './static/vendors/bootstrap/css'
    },
    fonts: {
        bootstrap: './static/vendors/bootstrap/fonts'
    }

};
    

gulp.task('default', ['watch']);

/**** Initialize bootstrap ****/

// initialize project with bootstrap files
gulp.task('copy-files-from-bootstrap', [
    'copy-bootstrap-less-files-except-variables', 
    'copy-bootstrap-fonts'
]);

// execute this task whenever a new version of bootstrap is installed
gulp.task('copy-bootstrap-less-files-except-variables', function() {
    // the variables.less file will be customized and therefore copied to a different directory
    return gulp.src([vendors.bootstrap.less_files_top, vendors.bootstrap.less_files_descendents], [{ignore: 'variables.less'}])
        .pipe(gulp.dest(app.less.bootstrap.dist));
});

// execute this whenever I need a fresh copy variables.less
gulp.task('copy-bootstrap-less-variables', function() {
    return gulp.src(vendors.bootstrap.less_variables)
        .pipe(gulp.dest(app.less.base));
});

gulp.task('copy-bootstrap-fonts', function() {
    return gulp.src(vendors.bootstrap.fonts)
        .pipe(gulp.dest(app.fonts.bootstrap));
});

/**** compile less files ****/

gulp.task('compile', [
    'copy-custom-bootstrap-variables',
    'compile-bootstrap',
    'compile-style',
    'autoprefix-bootstrap'
]);

// copy the custom variables.less file to the bootstrap dist folder
gulp.task('copy-custom-bootstrap-variables', function(){
    return gulp.src(app.less.bootstrap.variables)
        .pipe(gulp.dest(app.less.bootstrap.dist))
});

gulp.task('compile-bootstrap', function() {
    return gulp.src(app.less.bootstrap.dist + '/bootstrap.less')
        .pipe(less())
        .pipe(gulp.dest(app.css.bootstrap));
});

gulp.task('compile-style', function() {
    return gulp.src(app.less.style)
        .pipe(less())
        .pipe(gulp.dest(app.css.base))
});

gulp.task('autoprefix-bootstrap', function() {

    return gulp.src(app.css.bootstrap + '/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(app.css.bootstrap))
});

gulp.task('watch', function() {
    gulp.watch(app.less.style, ['compile'], function() {
        console.log(event.path + ': ' + event.type); 
    }); 
    gulp.watch(app.less + '/**/*.less', ['compile']); 
});
