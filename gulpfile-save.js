
var gulp = require('gulp');
var sass = require('gulp-sass');
var EmailBuilder = require('gulp-email-builder');
var rename = require('gulp-rename');

var options = { encodeSpecialChars: true }
var builder = EmailBuilder(options);

gulp.task('sass', function (done) {
    gulp.src('./scss/inline/inline.scss')
        .pipe(sass({
            includePaths: [
                './scss/inline'
            ],
            outputStyle: 'nested'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
    gulp.src('./scss/embedded/embedded.scss')
        .pipe(sass({
            includePaths: [
                './scss/embedded'
            ],
            outputStyle: 'nested'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
    done();
});

gulp.task('emailBuilder', function() {
    return gulp.src('./html/*.html')
        .pipe(builder.build())
        .pipe(rename(function (path) {
            path.basename += '-dist';
        }))
        .pipe(gulp.dest('./dist/'));
});

//Watch task

gulp.task('watch',function() {
    gulp.watch('resources/scss/**/*.scss', gulp.series('sass', 'emailBuilder'));
    gulp.watch('html/*.html', gulp.series('emailBuilder'));
});

gulp.task('default', gulp.series('sass', 'emailBuilder', 'watch'));
