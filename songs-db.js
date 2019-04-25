'use strict'

const { EventEmitter } = require('events')
const { Database } = require('sqlite3')
const path = require('path')

class SongsDb extends EventEmitter {
  constructor (dbFile = 'songs.db') {
    super()
    this.db = new Database(path.join(__dirname, dbFile))
    this.db.on('error', err => this.emit('error', err))
  }
}

module.exports = SongsDb
