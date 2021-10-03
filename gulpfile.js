// 'use strict';
let gulp = require('gulp');
let sass = require('gulp-sass'); // обработка sass v.4.0.2
let rename = require("gulp-rename"); // переменование файла v1.4.0
let browserSync = require('browser-sync'); // сервер
let autoprefixer = require('gulp-autoprefixer'); // вендорные префиксы v 7.0.0
let concat = require('gulp-concat'); // соединение файлов в один
var uglify = require('gulp-uglify'); // сжатие js
var cssmin = require('gulp-cssmin'); // cжатие css

gulp.task('sass', function () { //обработка sass
    return gulp.src('app/scss/**/*.scss') // основной файл sass
            .pipe(sass({outputStyle: 'compressed'})) // сжатие сss (compresed)
            .pipe(rename({suffix: '.min'})) // добавление к файлу css .min
            .pipe(autoprefixer({ // растовление вендорных префиксов
                overrideBrowserslist: ['last 10 versions'] // последние 10 версий браузеров
            })) 
            .pipe(gulp.dest('app/css')) // обработанный файл сss
            .pipe(browserSync.reload({stream: true})) //обновление страницы при изменении css
});

gulp.task('style', function(){ // дополнительные cтили к сайту
    return gulp.src([
        'node_modules/normalize.css/normalize.css', // нормолайс
        'node_modules/slick-carousel/slick/slick.css', // slik slider (как пример)
        'node_modules/rateyo/src/jquery.rateyo.css',// рейтинг звездочки
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css', // css fancybox
    ])
    .pipe(concat('libs.min.css')) // прописование этих файлов libs.css
    .pipe(cssmin()) // сжатие подключенных библиотек сss
    .pipe(gulp.dest('app/css')) // обработанный файл css
});


gulp.task('script', function(){ // дополнительные скрипты к сайту
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js', // slick slider ( как пример)
        'node_modules/mixitup/dist/mixitup.js', // табы
        'node_modules/rateyo/src/jquery.rateyo.js',// рейтинг звездочки
        // 'app/js/main.js' // дополнительно
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js', // плагин fancybox
    ])
    .pipe(concat('libs.min.js')) // прописование этих файлов libs.js
    .pipe(uglify()) // сжатие подключенных файлов js
    .pipe(gulp.dest('app/js')) // обработанный файл js
});

gulp.task('html', function(){ 
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true})) //обновление страницы при изменении html
});

gulp.task('js', function(){ 
    return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({stream: true})) //обновление страницы при изменении js
});

gulp.task('browser-sync', function() { // server
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('watch', function(){ // отсдеживание изменнений в файлах
    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'))
    gulp.watch('app/*.html', gulp.parallel('html'))
    gulp.watch('app/*.js', gulp.parallel('js'))
});

gulp.task('default', gulp.parallel('sass', 'style', 'script', 'watch', 'browser-sync')) // запуск тасков
