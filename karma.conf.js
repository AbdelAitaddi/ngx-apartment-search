// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const isCiEnvironment = process.env.ENV_CI === 'true';
const testDir = 'test-reports';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-junit-reporter'),
      require('karma-spec-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-jasmine-seed-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      jasmine: {
        seed: process.env['JASMINE_SEED'] || null,
      },
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text'],
      dir: `${testDir}/coverage`,
      // Combines coverage information from multiple browsers into one report rather than outputting a report
      // for each browser.
      combineBrowserReports: true,

      // if using webpack and pre-loaders, work around webpack breaking the source path
      fixWebpackSourcePaths: true,

      // Omit files with no statements, no functions and no branches covered from the report
      skipFilesWithNoCoverage: true,

      verbose: true, // output config used by istanbul for debugging

      // enforce percentage thresholds
      // anything under these percentages will cause karma to fail with an exit code of 1 if not running in watch mode
      thresholds: {
        emitWarning: true, // set to `true` to not fail the test command when thresholds are not met
        // thresholds for all files
        global: {
          statements: 85,
          lines: 85,
          branches: 85,
          functions: 85,
        },
        // thresholds per file
        each: {
          statements: 85,
          lines: 85,
          branches: 85,
          functions: 85,
        },
      },
    },
    junitReporter: {
      outputDir: `${testDir}/junit`,
    },

    angularCli: {
      environment: 'dev',
    },
    reporters: ['spec', 'junit', 'jasmine-seed', 'coverage-istanbul'],
    specReporter: {
      suppressSkipped: true,
      suppressSummary: false,
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [
      'ChromeForTesting',
      // 'Chrome',
      // 'MobileSafari'
    ],
    customLaunchers: {
      ChromeForTesting: {
        base: 'ChromeHeadless',
        // We have to disable sandbox feature for CI because it doesn't set up properly in Docker container
        // Suggested solution doesn't work
        // https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker
        flags: isCiEnvironment ? ['--no-sandbox'] : [],
      },
    },
    restartOnFileChange: true,
  });
};
