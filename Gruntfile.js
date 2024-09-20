module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    validation: {
      options: {
        doctype: 'HTML5',
      },
      files: {
        src: ['./*.html'],
      },
    },
    webfont: {
      icons: {
        src: 'assets/fonts/svgs/*.svg',
        dest: 'assets/fonts',
        options: {
          fontFilename: 'icons-{hash}',
          normalize: true,
          htmlDemo: false,
          fontFamilyName: 'Icons',
          template: 'icons.tmpl.scss',
          templateOptions: {
            baseClass: 'i',
            classPrefix: 'i-',
          },
          stylesheets: ['scss'],
          relativeFontPath: '../../assets/fonts',
        },
      },
    },
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 5,
          svgoPlugins: [{ removeViewBox: false }],
        },
        files: [
          {
            expand: true,
            cwd: 'images/',
            src: ['**/*.{png,jpg,gif,svg}'],
            dest: 'dist/img',
          },
        ],
      },
    },
    clean: {
      icons: ['assets/fonts/*icons*'],
    },
  });

  grunt.loadNpmTasks('grunt-w3c-html-validation');
  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
};
