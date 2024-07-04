import gulp from 'gulp';
import webpack from 'webpack-stream';
import rename from 'gulp-rename';
import { webpackConfig } from '../../webpack.config.js';

import { plugins } from '../config/plugins.js';
import { filePaths } from '../config/paths.js';
import { logger } from "../config/Logger.js";

const javaScript = (isBuild) => {
  const webpackMinify = webpackConfig(true); // Для минификации

  if (isBuild) {
    const webpackNonMinify = webpackConfig(false); // Для несжатой версии
    return gulp.src(filePaths.src.js, {sourcemaps: true})
        .pipe(logger.handleError('JS'))
        .pipe(webpack({config: webpackNonMinify})) // Компиляция без минификации
        .pipe(gulp.dest(filePaths.build.js))
        .pipe(plugins.browserSync.stream())
        .pipe(webpack({config: webpackMinify})) // Минификация
        .pipe(gulp.dest(filePaths.build.js));
  } else {
    return gulp.src(filePaths.src.js, {sourcemaps: true})
        .pipe(logger.handleError('JS'))
        .pipe(plugins.browserSync.stream())
        .pipe(webpack({config: webpackMinify})) // Минификация
        .pipe(gulp.dest(filePaths.build.js));
  }
};

export { javaScript };