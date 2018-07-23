const gulp = require('gulp');
const babel = require('gulp-babel');

// 默认任务
gulp.task('default', ['praise'], () =>
    gulp.watch(['src/**/*.es6', '!src/public/**/*.es6'], ['praise'])
);

// 编译es6文件
gulp.task('praise',['move'], () =>
    gulp.src(['src/**/*.es6', '!src/public/**/*.es6'])
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('build'))
);

// 移动所有js文件
gulp.task('move', () =>
    gulp.src(['src/**/*.js', '!src/public/**/*.js'])
        .pipe(gulp.dest('build'))
)