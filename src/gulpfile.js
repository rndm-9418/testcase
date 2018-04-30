var gulp = require('gulp'),
    sass = require('gulp-sass');
    imagemin = require("gulp-imagemin");
    pngquant = require('imagemin-pngquant');
    rename = require("gulp-rename");
    autoprefixer = require("autoprefixer");
    postcss = require('gulp-postcss');
    csscomb = require("gulp-csscomb");
    copy = require("gulp-copy");
    cssmin = require("gulp-cssmin");
    runSequence = require('run-sequence');
    imageminJpegRecompress = require('imagemin-jpeg-recompress');
    
gulp.task('sass', function() {
  return gulp.src(['sass/**/*.scss'])
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('css'))
  });

gulp.task('watch', function() {
  gulp.watch(['sass/**/*.scss', 'components/**/*.scss'], ['sass']);
});

gulp.task("copy", function(){
  return gulp.src(["html/**/*.*", "external/**/*.*"], {base: "."})
  .pipe(gulp.dest("../build/"));
})

gulp.task("style", function(){
  return gulp.src("css/common.css")
  .pipe(postcss([ 
    autoprefixer({ browsers: ["last 2 versions", "ie 10"] }) 
  ]))
  .pipe(csscomb())
  .pipe(cssmin({
    keepSpecialComments: 0
  }))
  .pipe(gulp.dest("../build/css"));
})

/*gulp.task("min-images", function(){
  return gulp.src("images/*.{jpg,png}")
  .pipe(imagemin([
    imagemin.gifsicle(),
    imageminJpegRecompress({
      loops:4,
      min: 50,
      max: 95,
      quality:'high' 
    }),
    imagemin.optipng(),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("../build/images"));
})*/

gulp.task('default', ['watch']);

gulp.task('build', function(callback) {
  runSequence("style", "copy", callback);
});