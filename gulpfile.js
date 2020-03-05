var less = require("gulp-less");
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

gulp.task('less', function () {
  return gulp.src("sources/less/style.less") // путь к файлам-исходникам
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
    autoprefixer()
    ]))

    .pipe(gulp.dest("sources/css")) // путь к папке, куда помещаем конечные файлы
	.pipe(server.stream());

});


//.pipe(plugin_name()) // название плагина, через который прогоняем их

 gulp.task("server", gulp.series("less"), function () {
  server.init({
    server: "source/"
  });
  gulp.watch('sources/less/**/*.less', gulp.series("less"), server.reload);
  //gulp.watch('sources/*.html', server.reload);

});

//запрос на просмотр изменений в less и компиляция в css
//series перезапускает задачу less
gulp.task('c', function () {
    gulp.watch('sources/less/**/*.less', gulp.series('less')); //series - перезапуск задачи LESS
});
