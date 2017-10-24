// new way to exclude "node_modules" from bundle
var nodeExternals = require('webpack-node-externals');

module.exports = {
    
    // target: 'node',
    // externals: [ nodeExternals() ],
    
    entry: [
        './source/index.js'
    ],
    
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    
    module: {
        rules: [
            {
                use: [
                    {
                        loader: 'babel-loader',
                        query: { presets: ['react', 'es2015', 'stage-1'] }
                    }
                ]
            }
        ]
    },
    
    devServer: {
        historyApiFallback: true,
        contentBase: './source/'
    }
};
