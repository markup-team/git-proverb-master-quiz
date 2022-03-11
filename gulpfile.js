// gulp 및 패키지 모듈 호출
var gulp = require('gulp'),
	// CSS 프리프로세서
	sourcemaps = require('gulp-sourcemaps'),
	scss = require('gulp-sass'),
	// CSS3 제조사의 접두사 처리 모듈
	autoprefixer = require('gulp-autoprefixer'),
	modifyCssUrls = require('gulp-modify-css-urls'),
	runSeq = require('run-sequence')

/**
 * ==============================+
 * @Path 정의
 * ==============================+
 */
var src = ''
var dist = './'
var paths = {
	html: src + './',
	css: src + 'assets/css/**/*.css',
	js: src + 'assets/js/**/*.js',
	scss: src + 'assets/scss/**/*.{sass,scss}',
}

/**
 * ==============================+
 * @SCSS : SCSS Config(환경설정)
 * ==============================+
 */
var scssOptions = {
	outputStyle: 'expanded', // nested, expanded, compact, compressed
	indentType: 'tab', // space, tab
	indentWidth: 1, // nested, expanded 인 경우에 사용
	precision: 1,
	sourceComments: false,
}

/**
 * ==================================+
 * @task : SCSS Compile & sourcemaps
 * ==================================+
 */
gulp.task('scss:compile', function(){
	return (gulp
			.src(paths.scss)
			.pipe(sourcemaps.init())
			.pipe(scss(scssOptions).on('error', scss.logError))
			.pipe(autoprefixer())
			.pipe(sourcemaps.write('./maps')) /* 소스맵 경로 */
			// .pipe(gulp.dest(dist + '/css'))
			.pipe(gulp.dest(dist + 'assets/css')) )
})

/**
 * ==================================+
 * @task : Change CSS URL Path
 * ==================================+
 */
gulp.task('modifyUrls', function(){
	return gulp
		.src(paths.css)
		.pipe(
			modifyCssUrls({
				modify(url) {
					return url.replace(/..\/..\/..\//g, '../')
				},
			})
		)
		.pipe(gulp.dest(dist + 'assets/css'))
})

/**
 * ==============================+
 * @task : gulp default
 * ==============================+
 */
gulp.task('default', () => runSeq('scss:compile', 'modifyUrls'))


/**
 * ==================================+
 * @task : watch 파일 변경을 감지
 * ==================================+
 */
gulp.task('watch', function () {
    gulp.watch(paths.html, ['html']);
    // gulp.watch(paths.js, ['js:combine']);
    gulp.watch(paths.scss, ['scss:compile']);
    gulp.watch(paths.css, ['modifyUrls']);

});

/**
 * ==============================+
 * @task : gulp default
 * ==============================+
 */
gulp.task('default', ['watch']);
