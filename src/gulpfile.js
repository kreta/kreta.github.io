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

var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  minifyCSS = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  scsslint = require('gulp-scss-lint'),
  svgSprite = require('gulp-svg-sprite'),
  uglify = require('gulp-uglify');

var folders = {
  assets: './Resources/assets',
  web: '../web'
};

var paths = {
  img: folders.assets + '/img',
  sass: folders.assets + '/scss',
  js: folders.assets + '/js',
  svg: folders.assets + '/svg',
  images: folders.assets + '/images',
  buildImg: folders.web + '/img',
  buildCss: folders.web + '/css',
  buildJs:  folders.web + '/js',
  buildSvg: folders.web + '/svg',
  buildImages: folders.web + '/images'
};

var watch = {
  sass: paths.sass + '/**/*.scss',
  js: paths.js + '/**/*.js',
  svg: paths.svg + '/**/*.svg'
};

gulp.task('images', function () {
  return gulp.src(paths.img)
    .pipe(gulp.dest(paths.buildImg));
});

gulp.task('sass', ['scss-lint'], function () {
  return gulp.src(paths.sass + '/app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.buildCss));
});

gulp.task('scss-lint', function () {
  return gulp.src([watch.sass, '!' + paths.sass + '/base/_reset.scss'])
    .pipe(scsslint({
      'config': './.scss_lint.yml'
    }));
});

gulp.task('sass:prod', ['sass'], function () {
  return gulp.src(paths.buildCss + '/app.css')
    .pipe(minifyCSS({keepSpecialComments: 0}))
    .pipe(rename({
      suffix: '.min'
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

gulp.task('js', function () {
  return gulp.src([paths.js + '/*.js'])
    .pipe(gulp.dest(paths.buildJs));
});

gulp.task('images', function () {
  return gulp.src([paths.images + '/*'])
    .pipe(gulp.dest(paths.buildImages));
});

gulp.task('js:prod', function () {
  return gulp.src([paths.js + '/*.js'])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.buildJs));
});

gulp.task('watch', function () {
  gulp.watch(watch.sass, ['sass']);
  gulp.watch(watch.js, ['js']);
  gulp.watch(watch.svg, ['sprites']);
});

gulp.task('default', ['images', 'sass', 'sprites', 'js', 'images']);

gulp.task('prod', ['images', 'sass:prod', 'js:prod', 'sprites', 'images']);
