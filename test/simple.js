'use strict'

const wrap = require('co').wrap
const reader = require('..')
const fs = require('promise.ify').all(require('fs-extra'))

// fixture
const filename = __dirname + '/fixtures/eason-k-king.mp3'

describe('It works', function() {
  it('simple', wrap(function*() {
    const info = yield reader(filename)
    info.singer.should.match(/陈奕迅/)
    info.title.should.match(/K歌之王/)
    info.album.should.match(/打得火热/)
  }))

  it('fd supported', wrap(function*() {
    const fd = yield fs.openAsync(filename, 'r')
    const info = yield reader(fd)
    info.singer.should.match(/陈奕迅/)
    info.title.should.match(/K歌之王/)
    info.album.should.match(/打得火热/)
  }))
})