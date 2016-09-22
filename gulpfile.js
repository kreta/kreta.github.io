/*
 * This file is part of the Lightweight Standard project.
 *
 * Copyright (c) 2015 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Gorka Laucirica <gorka.lauzirika@gmail.com>
 * @author Beñat Espiña <benatespina@gmail.com>
 */

'use strict';

var
  gulp = require('gulp'),
  cssNano = require('gulp-cssnano'),
  cssnext = require('postcss-cssnext'),
  postcss = require('gulp-postcss'),
  sass = require('gulp-sass'),
  svgSprite = require('gulp-svg-sprite');

var folders = {
  assets: './assets',
  root: './'
};

var paths = {
  sass: folders.assets + '/scss',
  svg: folders.assets + '/svg',
  buildCss: folders.root + '/css',
  buildSvg: folders.root + '/svg'
};

var watch = {
  sass: paths.sass + '/**/*.scss',
  svg: paths.svg + '/**/*.svg'
};

gulp.task('sass', function () {
  return gulp.src(paths.sass + '/app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(postcss([cssnext]))
    .pipe(cssNano({
      keepSpecialComments: 1,
      rebase: false
    }))
    .pipe(gulp.dest(paths.buildCss));
});

gulp.task('sprites', function () {
  return gulp.src(paths.svg + '/*.svg')
    .pipe(svgSprite({
      mode: {
        symbol: {
          dest: '',
          sprite: 'symbols',
          example: {dest: 'symbols'}
        }
      }
    }))
    .pipe(gulp.dest(paths.buildSvg));
});

gulp.task('watch', function () {
  gulp.watch(watch.sass, ['sass']);
  gulp.watch(watch.svg, ['sprites']);
});

gulp.task('default', ['sass', 'sprites']);
