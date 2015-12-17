module.exports = function (grunt) {

  grunt.config('concat', {

    options: {
      separator: ';',
    },
    dist: {
      src: ['<%= cfg.src %>/deg.slackapi.module.js', '<%= cfg.src %>/deg.slackapi.services.js'],
      dest: '<%= cfg.build %>/ng-deg.slackapi.js',
    },

  });

};