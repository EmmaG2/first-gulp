// CSS
import autoprefixer from 'autoprefixer'
import cssnanoPlugin from 'cssnano'
import postcss from 'gulp-postcss'

// HTML
import htmlmin from 'gulp-htmlmin'

// Pug 
import GulpPug from 'gulp-pug'

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
const cssRoute = './src/css/*.css'
const pugRoute = './src/views/**/*.pug'

const production = process.env.PRODUCTION;

gulp.task('css', () => {
  return gulp
    .src(cssRoute)
    .pipe(concat('styles-min.css'))
    .pipe(postcss(cssPlugins))
    .pipe(gulp.dest('./public/css'))

})

// gulp.task('html', () => {
//   return gulp
//     .src(htmlRoute)
//     .pipe(htmlmin({
//       collapseWhitespace: true,
//       removeComments: true
//     }))
//     .pipe(gulp.dest('./public'))
// })

gulp.task('babel', () => {
  return gulp
    .src(babelRoute)
    .pipe(concat('scripts-min.js'))
    .pipe(babel())
    .pipe(terser())
    .pipe(gulp.dest('./public/js'))
})

gulp.task('pug', () => {
  return gulp
    .src(pugRoute)
    .pipe(GulpPug({
      pretty: production ? false : true
    }))
    .pipe(gulp.dest('./public/views'))
})

gulp.task('default', () => {
  gulp.watch([
    babelRoute,
    cssRoute,
    './src/views/**/*.pug'
  ],
    gulp.series([
      'babel',
      'css',
      'pug'
    ]))
})