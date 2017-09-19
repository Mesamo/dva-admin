module.exports = {
  stripPrefix: 'dist/',
  staticFileGlobs: [
    'dist/favicon.ico',
    'dist/manifest.json',
    'dist/index.html',
    'dist/assets/**/*',
    'dist/static/*',
    'dist/*.js',
    'dist/*.css'
  ],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: 'dist/service-worker.js'
};
