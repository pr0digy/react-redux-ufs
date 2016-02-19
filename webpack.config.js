var path = require('path')
var webpack = require('webpack')

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		'./src/index.js'
	],

	output: {
		path: path.join(__dirname, 'static'),
		filename: 'bundle.js'
	},

	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],

	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			loader: 'babel',
			
			query: {presets: ['react', 'es2015', 'stage-0']},
			exclude: /node_modules/,
			include: __dirname
		}, {
			test: /\.less?$/,
			loaders: ['style', 'raw', 'less'],
			include: __dirname
		}, { 
			test: /\.gif$/, 
			loader: "url-loader?mimetype=image/png" 
		}, { 
			test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, 
			loader: "url-loader?mimetype=application/font-woff" 
		}, { 
  		test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, 
  		loader: "file-loader?name=[name].[ext]" 
  	}]
	}
}