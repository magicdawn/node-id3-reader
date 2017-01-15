'use strict'

const reader = require('..')
const filename = '/Users/magicdawn/Music/yun/magicdawn喜欢的音乐/陈奕迅 - K歌之王.mp3'

reader(filename)
  .then(ret => console.log(ret))
  .catch(e => console.error(e.stack))