'use strict'

const path = require('path')
const co = require('co')
const pify = require('promise.ify')
const fs = pify.all(require('fs-extra'))
const parser = require('./lib/parser.js')
const LocalUtil = require('./lib/util.js')

const FILE_TOO_SMALL = 'file too small'

/**
 * get ID3 info
 */

module.exports = co.wrap(function*(filename) {
  filename = path.resolve(filename)
  const fd = yield fs.openAsync(filename, 'r')
  const stat = yield fs.fstatAsync(fd)
  if (stat.size < 10) {
    throw new Error(FILE_TOO_SMALL)
  }

  const buf = Buffer.alloc(4)
  yield fs.readAsync(
    fd, buf,
    0, buf.length, 6 // offset, length, position
  )
  const minSize = LocalUtil.getID3TotalSize(buf)
  if (stat.size <= minSize) {
    throw new Error(FILE_TOO_SMALL)
  }

  const stream = fs.createReadStream('', {
    fd,
  })
  const p = parser.create()
  process.nextTick(() => {
    stream.pipe(p)
  })

  return yield new Promise(resolve => {
    p.on('readable', function() {
      resolve(p.read())
    })
  })
})