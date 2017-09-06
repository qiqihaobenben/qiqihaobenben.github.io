var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
// 压缩js
gulp.task('miniJs',function (){
    var min = gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    return min;
})

// 压缩css
gulp.task('miniCss',function (){
    var min = gulp.src(['css/*.css'])
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'));
    return min;
})

// 压缩图片
gulp.task('miniImg',function (){
    gulp.src('images/*')
        .pipe(imagemin(
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({plugins: [{removeViewBox: true}]})
        ))
        .pipe(gulp.dest('dist/images'));
})

// 监测js文件变动
gulp.task('autoMiniJs',function (){
    gulp.watch('js/*.js',['miniJs'])
})

// 监测css文件变动
gulp.task('autoMiniCss',function (){
    gulp.watch('css/*.css',['miniCss'])
})

gulp.task('default',['miniJs', 'miniCss', 'miniImg', 'autoMiniJs', 'autoMiniCss'])