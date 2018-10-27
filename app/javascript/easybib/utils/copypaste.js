import clipboard from 'clipboard-polyfill'
// https://www.npmjs.com/package/clipboard-polyfill

clipboard.copy = data => {
  const dt = new clipboard.DT()
  // html should be set first.
  if ('text/html' in data) dt.setData('text/html', data['text/html'])
  if ('text/plain' in data) dt.setData('text/plain', data['text/plain'])
  clipboard.write(dt)
}

export default clipboard
