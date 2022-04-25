const path = require('path');

module.exports = {
  entry: ['regenerator-runtime/runtime.js', './client/src/Index.jsx'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './client/dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      }, {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          'style-loader',
          'css-loader',
          // since sass-loader updated to ^v8.00
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentWidth: 4,
                includePaths: ['absolute/path/a', 'absolute/path/b'],
              },
            },
          }],
      },
      {
        test: /\.(png|svg|jpg|gif|wav|mp3|eot|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
