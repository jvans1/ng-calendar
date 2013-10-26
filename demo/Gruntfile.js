// Generated on 2013-09-29 using generator-angular 0.4.0
'use strict';
module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 9001,
          base: './index.html'
        }
      }
    }
  });
};

