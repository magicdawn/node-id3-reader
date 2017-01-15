'use strict'

const fs = require('fs')

// const stream = module.exports = fs.createReadStream()

const file =
const fd = fs.openSync(file, 'r')
const buf = Buffer.alloc(1000)
fs.readSync(fd, buf,
  0, buf.length, 0 // offset, length, position
)

console.log(buf)
module.exports.buf = buf

module.exports.stream = fs.createReadStream(file)