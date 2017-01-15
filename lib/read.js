'use strict'

const fs = require('fs')

// const stream = module.exports = fs.createReadStream()

const file = '/Users/magicdawn/Music/yun/magicdawn喜欢的音乐/陈奕迅 - K歌之王.mp3'
const fd = fs.openSync(file, 'r')
const buf = Buffer.alloc(1000)
fs.readSync(fd, buf,
  0, buf.length, 0 // offset, length, position
)

console.log(buf)
module.exports.buf = buf

module.exports.stream = fs.createReadStream(file)