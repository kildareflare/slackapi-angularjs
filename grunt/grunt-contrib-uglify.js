module.exports = function (grunt) {

    grunt.config('uglify', {
 
        dev: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                mangle: {
                    except: ['$', 'require', 'exports']
                }
            },
            files: {
                '<%= cfg.build %>/ng-deg.slackapi.min.js': ["<%= cfg.build %>/ng-deg.slackapi.js"]
            }
        },
    });


};