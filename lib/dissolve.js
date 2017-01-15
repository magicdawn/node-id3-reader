'use strict'
/* eslint camelcase: off */

const Dissolve = require('dissolve')
const $ = require('./util.js')

const parser = Dissolve()
  .string('header', 3) // ID3
  .uint8('ver')
  .uint8('reversion')
  .uint8('flag', 1)
  .buffer('size', 4)
  .tap(function() {
    this.vars.size = $.getID3TotalSize(this.vars.size)
    this.vars.ID3 = []
    this.curSize = 10
  })
  .loop(function(end) {
    if (this.curSize >= this.vars.size) {
      return end()
    }

    this
      .string('cur_id', 4)
      .uint32be('cur_size')
      .uint16be('cur_flag')
      .tap(function() {
        this.buffer('cur_content', this.vars.cur_size).tap(function() {
          this.vars.ID3.push({
            id: this.vars.cur_id,
            content: $.getTagString(this.vars.cur_content)
          })

          this.curSize += 10 + this.vars.cur_size
        })
      })
  })
  .tap(function() {
    this.push(this.vars)
    this.push(null)
  })

parser.on('readable', function() {
  let e
  while ((e = parser.read())) {
    console.log(e)
  }
})

const file = require('./read.js')
file.stream.pipe(parser)