const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const gutil = require('gulp-util');
//压缩scss文件
gulp.task('sass',()=>{
	gulp.src('./src/sass/*.scss')
	.pipe(sass())
	.pipe(cssnano())
	.pipe(rename({"suffix" : ".min"}))
	.pipe(gulp.dest('./dist/css'))
})
//压缩图片
gulp.task('images',()=>{
	gulp.src('./src/images/*')
	.pipe(imagemin())
	.pipe(gulp.dest('./dist/images'))
})
//压缩jQuery导入的文件
gulp.task('jquery',()=>{
	gulp.src('./src/js/jquery*.js')
	.pipe(uglify())
	.pipe(rename({"suffix" : ".min"}))
	.pipe(gulp.dest('./dist/js'))
})
// es6===>es5
gulp.task('es6',()=>{
	gulp.src('./src/js/ES6JS/*.js')
        .pipe(babel({
        	presets: ['@babel/env']
        }))
       //	.pipe(remove())
        .pipe(gulp.dest('./src/js/ES5JS'))
})
// gulp.task("es6", function () {
// 	return gulp.src("src/js/ES6JS/*.js")// ES6 源码存放的路径
// 	  .pipe(babel()) 
// 	  .pipe(gulp.dest("./src/js/ES5JS")); //转换成 ES5 存放的路径
//   });
//处理js任务
gulp.task('js',function(){
	gulp.src('./src/js/ES5JS/*.js')
	.pipe(uglify())
	.pipe(rename({"suffix" : ".min"}))
//	.pipe(concat('main.min.js'))
	.pipe(gulp.dest('./dist/js'));
})
gulp.task('mastake', function() {
	gulp.src(['./src/js/ES6JS/*.js'])
		.pipe(uglify())
		.on('error', function(err) {
			gutil.log(gutil.colors.red('[Error]'), err.toString());
		})
		.pipe('./src/js/ES5JS');
})
//自动监听
gulp.task('default',()=>{
	gulp.watch(['./src/sass/*.scss'],['sass']);
	gulp.watch(['./src/js/ES5JS/*.js'],['js']);
	gulp.watch(['./src/js/ES6JS/*.js'],['es6'])
})
