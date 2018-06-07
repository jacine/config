'use strict';

/**
 * @file
 * Processes Drupal's YML config from `../config`, converts to JSON, and places
 * in `./data` for Gatsby.
 */

const gulp = require('gulp'),
debug = require('gulp-debug'),
watch = require('gulp-watch'),
notify = require('gulp-notify'),
plumber = require('gulp-plumber'),
rename = require('gulp-rename'),
replace = require('gulp-replace'),
yaml = require('gulp-yaml');


// Error Handler
//------------------------------------------------------------------------------
// This function uses gulp-notify to pipes errors through to OS X notifications
// and terminal. If you have a syntax error in your JavaScript, this code will
// notify you of the error w/sound and will remain running, allowing you to fix
// without having to restart Gulp.
//------------------------------------------------------------------------------

var errorHandler = function (error) {
  notify.onError({
    title: 'Task Failed [' + error.plugin + ']',
    message: 'Something went wrong: <%= error.message %>',
    sound: 'Sosumi'
  })(error);
  // Prevent Gulp watch from stopping.
  this.emit('end');
};


gulp.task('config', () => {
  return gulp
    .src([
      '../config/*.yml',
      // Everything below this line fails, some because keys begin w/numbers.
      '!../config/entity_browser.browser.file.yml',
      '!../config/entity_browser.browser.form_file.yml',
      '!../config/entity_browser.browser.image.yml',
      '!../config/entity_browser.browser.location_physical.yml',
      '!../config/entity_browser.browser.location_mailing.yml',
      '!../config/image.style.large.yml',
      '!../config/image.style.medium.yml',
      '!../config/image.style.thumbnail.yml',
      // These fail with: "Names must match /^[_a-zA-Z][_a-zA-Z0-9]*$/ but "1"
      // does not."
      '!../config/group.content_type.group_content_type_6220fe52160e9.yml',
      '!../config/group.role.department-09cda1d07.yml',
      '!../config/group.role.department-855450a16.yml',
      '!../config/group.role.department-a416e6833.yml',
      '!../config/metatag.metatag_defaults.403.yml',
      '!../config/metatag.metatag_defaults.404.yml',
      '!../config/system.site.yml',
      // This one fails because of !!binary, on 571. Can get around this by not
      // using JSON_SCHEMA.
      '!../config/views.view.files.yml',
      // These fail because of numeric keys, e.g. group: 1 AND
      '!../config/views.settings.yml',
      '!../config/views.view.archive.yml',
      '!../config/views.view.content.yml',
      '!../config/views.view.content_recent.yml',
      '!../config/views.view.entity_browser_file.yml',
      '!../config/views.view.entity_browser_image.yml',
      '!../config/views.view.entity_browser_location.yml',
      '!../config/views.view.frontpage.yml',
      '!../config/views.view.glossary.yml',
      '!../config/views.view.group_members.yml',
      '!../config/views.view.group_nodes.yml',
      '!../config/views.view.media.yml',
      '!../config/views.view.redirect.yml',
      '!../config/views.view.search.yml',
      '!../config/views.view.services.yml',
      '!../config/views.view.taxonomy_term.yml',
      '!../config/views.view.user_admin_people.yml',
      '!../config/views.view.watchdog.yml',
    ])
    .pipe(plumber({ errorHandler: errorHandler }))
    .pipe(yaml({ schema: 'JSON_SCHEMA' }))
    .pipe(rename(function (path) {
      // var name = path.basename.split('.');
      // path.dirname = name[0];
      // return path;
    }))
    .pipe(gulp.dest('./data/'))
});


gulp.task('watch', ['config'], () => {
  gulp.watch('../config/*.yml', ['config']);
});


gulp.task('default', ['config', 'watch']);
