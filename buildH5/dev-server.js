var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.devH5-2.conf')

var app = express()
var compiler = webpack(config)

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
}))

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler))

app.use('/static', express.static('static'))

app.listen(8881, '192.168.0.197', function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:8881')
})