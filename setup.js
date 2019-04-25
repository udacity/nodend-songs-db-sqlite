'use strict'

const { Database } = require('sqlite3')
const fs = require('fs')
const path = require('path')
const dbFile = path.join(__dirname, 'songs.db')

// Delete db file
try {
  fs.unlinkSync(dbFile)
} catch (err) {
  // Ignore
}

// Create a new db file
const db = new Database(dbFile)

db.serialize(() => {
  db.run(`
    CREATE TABLE songs (
      id INTEGER PRIMARY KEY,
      artist TEXT,
      album TEXT,
      song TEXT
    )
  `, done)

  const songs = [{
    artist: 'Bisou',
    album: 'Music Spaceshift',
    song: 'Bad Flower'
  }, {
    artist: 'Bisou',
    album: 'Music Spaceshift',
    song: 'Panda'
  }, {
    artist: 'Bisou',
    album: 'Music Spaceshift',
    song: 'Industrial'
  }, {
    artist: 'Bisou',
    album: 'Haumea',
    song: 'Moon Answer'
  }, {
    artist: 'Komiku',
    album: `It's time for adventure`,
    song: 'La Citadelle'
  }, {
    artist: 'Komiku',
    album: `It's time for adventure`,
    song: 'Bleu'
  }]

  const smt = db.prepare('INSERT INTO songs VALUES (?,?,?,?)')
  songs.forEach((song, idx) => {
    console.log('Creating:', JSON.stringify(song))
    smt.run(idx, song.artist, song.album, song.song)
  })
  smt.finalize()
})
db.close()

function done (err) {
  if (err) {
    throw err
  }
}
