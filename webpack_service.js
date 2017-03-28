var webpack = require("webpack");
var config =require('./webpack.config.js');
// returns a Compiler instance
console.log(config);
var compiler = webpack(config);

compiler.run(function(err, stats) {

});
// or
compiler.watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
    poll: true // use polling instead of native watchers
    // pass a number to set the polling interval
}, function(err, stats) {
});
console.log('啧啧啧,开始写前端啦?')