const path = require('path');

module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    modules: ['node_modules'],
    alias: {
      chai: path.resolve(__dirname, "node_modules/chai/chai.js"),
      chart: path.resolve(__dirname, 'node_modules/chart.js/dist/Chart.js'),
      xlsx: path.resolve(__dirname, 'node_modules/xlsx/xlsx.js')
    }
  },
  entry: './src/main/typescript/animatedcharts/index.ts',
  output: {
    path: path.resolve(__dirname, 'webapp/resources/js'),
    filename: 'index.js'
  }
};