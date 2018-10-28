module.exports = wallaby => ({
  files: [
    'app/javascript/easybib/**/*.+(j|t)s?(x|on)',
    '!app/javascript/easybib/**/*.test.+(j|t)s?(x)',
    'config/jest/*.js',
  ],
  tests: ['app/javascript/easybib/**/*.test.+(j|t)s?(x)'],
  env: {
    type: 'node',
    runner: 'node',
  },
  testFramework: 'jest',
  compilers: {
    '**/*.js?(x)': wallaby.compilers.babel({}),
  },
  preprocessors: {
    '**/*.js?(x)': file => require('@babel/core').transform(
      file.content,
      {sourceMap: true, compact: false, filename: file.path, plugins: ['babel-plugin-jest-hoist']})
  }
})
