const configuration = {
    basePath: '',
    frameworks: [
        'mocha',
        'browserify'
    ],
    files: [
        '../test/unit.test.js',
        '../test/issues.test.js',
        '../test/performance.test.js'
    ],
    port: 9876,
    colors: true,
    autoWatch: false,

    // Karma plugins loaded
    plugins: [
        'karma-mocha',
        'karma-browserify',
        'karma-chrome-launcher'
    ],

    // Source files that you wanna generate coverage for.
    // Do not include tests or libraries (these files will be instrumented by Istanbul)
    preprocessors: {
        '../test/*.test.js': ['browserify']
    },

    client: {
        mocha: {
            bail: true,
            timeout: 6000
        }
    },
    browsers: ['ChromeNoSandbox'],
    browserDisconnectTimeout: 6000,
    processKillTimeout: 6000,
    customLaunchers: {
        ChromeNoSandbox: {
            base: 'Chrome',
            flags: ['--no-sandbox']
        }
    },
    singleRun: true
};

if (process.env.TRAVIS) {

    /**
     * overwrite reporters-default
     * So no big list will be shown at log
     */
    // configuration.reporters = [];
}

module.exports = function(config) {
    config.set(configuration);
};
