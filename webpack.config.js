module.exports = {
    entry: './src/asgardsystem/asgardsystem.js',
    output: {
        path: './bin/js',
        filename: 'AsgardSystem.js'
    },
    module: {
        //加载器配置
        // loaders: [
        //     {
        //         test: /\.css$/,
        //         loader: 'style-loader!css-loader'
        //     },
        //     {
        //         test: /\.(png|jpg)$/,
        //         loader: 'url-loader?limit=819200'
        //     }
        // ]
    }
};