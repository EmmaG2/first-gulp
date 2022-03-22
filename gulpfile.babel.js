// CSS
import autoprefixer from 'autoprefixer'
import cssnanoPlugin from 'cssnano'
import postcss from 'gulp-postcss'

// HTML
import htmlmin from 'gulp-htmlmin'

//  JS
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import gulp from 'gulp'
import terser from 'gulp-terser'

// Constantes
const cssPlugins = [
  cssnanoPlugin(),
  autoprefixer()
]
const babelRoute = './src/js/*.js'
const htmlRoute = './src/*.html'
const cssRoute = './src/css/*.css'

gulp.task('css', () => {
  return gulp
    .src(cssRoute)
    .pipe(concat('styles-min.css'))
    .pipe(postcss(cssPlugins))
    .pipe(gulp.dest('./public/css'))

})

gulp.task('html', () => {
  return gulp
    .src(htmlRoute)
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./public'))
})

gulp.task('babel', () => {
  return gulp
    .src(babelRoute)
    .pipe(concat('scripts-min.js'))
    .pipe(babel())
    .pipe(terser())
    .pipe(gulp.dest('./public/js'))
})

gulp.task('default', () => {
  gulp.watch([
    htmlRoute,
    babelRoute,
    cssRoute
  ],
    gulp.series([
      'html',
      'babel',
      'css'
    ]))
})