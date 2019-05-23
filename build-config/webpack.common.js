const path = require('path')

module.exports = {
  target: 'web',
  entry: [
    '@babel/polyfill',
    'core-js/modules/es6.promise',
    'core-js/modules/es6.array.iterator',
    path.join(__dirname, '../src/index.js')
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react', '@babel/preset-env'],
            plugins: ['@babel/plugin-syntax-dynamic-import']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'shadersplay.bundle.js'
  }
}
