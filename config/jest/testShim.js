import 'easybib/utils/localStoragePolyfill'
// polyfill for requestAnimationFrame
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0)
}
