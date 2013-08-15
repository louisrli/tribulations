module.exports = (grunt) ->
  grunt.initConfig(
    pkg: grunt.file.readJSON('package.json')

    uglify:
      options:
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      build:
        files:
          'dist/<%= pkg.name %>.min.js' : 'dist/<%= pkg.name %>.js'

    coffee:
      compile:
        options:
          bare: true
        files:
          "dist/<%= pkg.name %>.js": "src/<%= pkg.name %>.coffee"

      compiletest:
        files:
          "test/marionette-tests.js": "test/marionette-tests.coffee"

    qunit:
      all: ['test/*.html']

  )

  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-qunit')

  grunt.registerTask('default', ['coffee:compile', 'uglify', 'coffee:compiletest', 'qunit'])
  grunt.registerTask('test', ['coffee:compile', 'coffee:compiletest', 'qunit'])
  grunt.registerTask('release', ['coffee', 'qunit', 'uglify'])
