'use strict'

const wrap = require('co').wrap
const reader = require('..')

describe('It works', function() {
  it('simple', wrap(function*() {
    const info = yield reader(__dirname + '/fixtures/eason-k-king.mp3')
    info.singer.should.match(/陈奕迅/)
    info.title.should.match(/K歌之王/)
    info.album.should.match(/打得火热/)
  }))

  it.skip('fd supported', wrap(function*() {

  }))
})