
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


//console.log(process.env.NODE_ENV);
//process.exit();


const plugins = [];
if (process.env.NODE_ENV === 'disc')
    plugins.push(new BundleAnalyzerPlugin());

module.exports = {
    mode: 'production',
    entry: './dist/es/browserify.index.js',
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
            })
        ]
    },
    plugins,
    output: {
        path: path.resolve(__dirname, '../test_tmp'),
        filename: 'webpack.bundle.js'
    },
    resolve: {
        fallback: {
            'crypto': require.resolve('crypto-browserify'),
            'stream': require.resolve('stream-browserify')
        }
    }
};
