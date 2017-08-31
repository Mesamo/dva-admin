module.exports = {
  stripPrefix: 'dist/',
  staticFileGlobs: [
    'dist/favicon.ico',
    'dist/manifest.json',
    'dist/assets/**/*',
    'dist/static/*',
    'dist/*common*'
  ],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: 'dist/service-worker.js'
};
