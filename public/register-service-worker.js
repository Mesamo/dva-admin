const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

(function register() {
  if ('serviceWorker' in navigator && !isLocalhost) {
    navigator.serviceWorker.register('/service-worker.js')
  }
}())
