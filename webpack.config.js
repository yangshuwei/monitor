const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
module.exports = {
  
  mode:"development",
  context: process.cwd(),
  entry: './src/index.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:"monitor.js"
  },
  module:{

  },
  devServer:{
    contentBase:path.resolve(__dirname,'dist')
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:"./src/index.html",
      inject:"head",
      scriptLoading:'blocking'
    }),
  ]
}