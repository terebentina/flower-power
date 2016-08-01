const path = require('path');
const app = require('express')();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

if (!process.env.NODE_ENV || process.env.NODE_ENV == 'development') {
  const webpackConfig = require('./webpack.config.dev');
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath, stats: { colors: true },
  }));

  app.use(webpackHotMiddleware(compiler));

  app.use('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });
}

app.listen(process.env.PORT || 3000, process.env.HOSTNAME || '0.0.0.0', () => {
  console.log('App started');
});
