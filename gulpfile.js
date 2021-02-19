var gulp =  require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('hello', function() {
    console.log('Hello gulp est activé');
  });

  //Pre-compile sasss
  var sass = require('gulp-sass');
    gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children directories
      .pipe(sass())
      .pipe(gulp.dest('app/css'))
  })

  gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', ['sass']); 
    // autres observations
  })
 
  //compile js
  var concat = require('gulp-concat');
 
  gulp.task('scripts', function() {
    return gulp.src('app/js/*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest('./dist/main.min.js'));
  });


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'app/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("app/js"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        server: "./app"  
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'app/scss/*.scss'], gulp.series('sass'));
    gulp.watch("app/*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.parallel('js','serve'));

// Clean CSS
const cleanCSS = require('gulp-clean-css');
gulp.task('minify-css', () => {
  return gulp.src('app/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});


const imagemin = require('gulp-imagemin');
 
exports.default = () => (
    gulp.src(['app/img/*', 'app/img/card/*', 'app/img/image-porfolio/*', 'app/img/picture/*', 'app/img/shape/*', 'app/img/slide/*'])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);