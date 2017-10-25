

var gulp = require('gulp');

function onError ( err ) {
    var gutil = require('gulp-util');
    gutil.log(gutil.colors.red('ERROR: =\ \n'), err, '\n___________________________________________________');
    this.emit('end', new gutil.PluginError('watch-util', err, { showStack: true }));
};
/*-------------------------------------------------
        CSS PREPROCESSOR
---------------------------------------------------*/
// 'gulp-less'
gulp.task('less', function () {
    var less = require('gulp-less');
    return gulp
        .src('./src/style/all.less')
        // .pipe( $.sourcemaps.init() )
        .pipe( (require('gulp-less'))(/*{ plugins: [lessAutoprefix] }*/) )
        // prevent breaking errors
        .on('error', onError )
        // .pipe( $.sourcemaps.write() )
        .pipe( gulp.dest('./src/style') );
});

/*-------------------------------------------------
    WATCHERS
---------------------------------------------------*/
gulp.task('watch-less', ['less'], function ( done ) {
    gulp.watch('./src/style/*.less', ['less']);
});