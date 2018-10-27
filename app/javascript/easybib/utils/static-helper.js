// For static html generation (make build-html)
// some stuff that redux(etc) needs to work without a browser
global.window = { location: '' }
global.gon = {}
/* eslint-disable semi */
// semi colon is needed at the end for node.
global.document = { body: { style: {} } }
