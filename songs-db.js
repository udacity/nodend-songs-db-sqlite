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

  async _insert (query, params) {
    return new Promise((resolve, reject) => {
      // onComplete callback needs to be a normal function
      function onComplete (err) {
        if (err) return reject(err)

        resolve({ id: this.lastID })
      }

      this.db.run(query, params, onComplete)
    })
  }

  async _list (query, params) {
    return new Promise((resolve, reject) => {
      const results = []

      // Accumulate Rows
      const onRow = (err, row) => {
        if (err) return reject(err)

        results.push(row)
      }

      // Completion Callback
      const onComplete = (err, times) => {
        if (err) return reject(err)

        resolve(results)
      }

      this.db.each(query, params, onRow, onComplete)
    })
  }

  async listSongsByArtist (artist) {
    return this._list(
      'SELECT * FROM songs WHERE artist = ?',
      [ artist ]
    )
  }

  async listSongsByArtistAndAlbum (artist, album) {
    return this._list(
      'SELECT * FROM songs WHERE artist = ? AND album = ?',
      [ artist, album ]
    )
  }

  async createSong ({ artist, album, song, genreId }) {
    return this._insert(
      'INSERT INTO songs (artist, album, song, genre_id) VALUES (?, ?, ?, ?)',
      [ artist, album, song, genreId ]
    )
  }

  async listSongsByGenre (genre) {
    return this._list(
      `SELECT s.artist, s.album, s.song, g.name FROM songs s
       INNER JOIN genres g ON g.id = s.genre_id WHERE g.name = ?`,
      [ genre ]
    )
  }
}

module.exports = SongsDb
