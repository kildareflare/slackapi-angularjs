module.exports = function (grunt) {

    grunt.config('clean', {
        default: {
            src: [
              '<%= cfg.build %>'
            ]
        }
    });
};