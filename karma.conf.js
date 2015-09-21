/* karma.config.js */

// Karma configuration
// Generated on Sat Jul 11 2015 13:38:28 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    // WARNING: do NOT forget to replace ui-bootstrap.tpls.min.js once I'm using my own custom templates
    files: [
      'node_modules/lodash/index.js',
      'node_modules/angular/angular.js',
      'node_modules/restangular/dist/restangular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/angular-sanitize/angular-sanitize.min.js',
      'node_modules/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'node_modules/ui-select/dist/select.min.js',
      'app/adr.module.js',
      'app/**/*.module.js',
      'app/*.js',
      'app/**/*.js',
      'app/*.html',
      'app/**/*.html',
      'app/**/*.spec.js',
      //'spec/**/*[sS]pec.js',
      //'spec/*[sS]pec.js'
    ],

    // list of files to exclude
    exclude: [
      'app/*.js.swp',
      'app/*.html.swp',
      'app/**/*.js.swp',
      'app/**/*.js.swp',
      'spec/*.swp',
      'spec/**/*.swp'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
	    'app/*.html': ['ng-html2js'],
	    'app/**/*.html': ['ng-html2js']
    },


    ngHtml2JsPreprocessor: {
	    moduleName: 'html2js-preprocessed-templates'
    },



    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['Chrome', 'Safari', 'PhantomJS'],
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
