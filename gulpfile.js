var gulp = require("gulp");
var postcss = require("gulp-postcss");
var postcssimport = require("postcss-import");
var cssnext = require("cssnext");
var nano = require("gulp-cssnano");
var rename = require("gulp-rename");
var gzip = require("gulp-gzip");
var size = require("gulp-size");

var files = [ "./src/fractures.css" ];
var postcssProcessors = [
	postcssimport(),
	cssnext()
];

gulp.task("default", function() {
	return gulp.src(files)
		.pipe(postcss(postcssProcessors))
		.pipe(gulp.dest("./dist"));
});

gulp.task("build", function() {
	return gulp.src(files)
		.pipe(postcss(postcssProcessors))
		.pipe(size())
		.pipe(nano())
		.pipe(size())
		.pipe(rename("fractures.min.css"))
		.pipe(gulp.dest("./dist"))
		.pipe(gzip())
		.pipe(size())
		.pipe(rename("fractures.min.css.gz"))
		.pipe(gulp.dest("./dist"));
});

gulp.task("watch", function() {
	return gulp.watch("./src/*.css", ["default", "build"]);
});
