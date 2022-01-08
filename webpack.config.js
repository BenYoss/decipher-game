const path = require('path');

module.exports = {
  entry: './client/src/Index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './client/dist'),
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        loader: 'babel-loader',
        exclude: '/node_modules',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      }, {
        test: /\.scss|\.sass$/,
        exclude: '/node_modules',
        use: ['style-loader', 'sass-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
