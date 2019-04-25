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
    CREATE TABLE genres (
      id INTEGER PRIMARY KEY,
      name TEXT
    )
  `, done)
  db.run(`
    CREATE TABLE songs (
      id  INTEGER PRIMARY KEY,
      artist TEXT,
      album TEXT,
      song TEXT,
      genre_id INTEGER,
      FOREIGN KEY(genre_id) REFERENCES genres(id)
    )
  `, done)

  const genres = [{
    id: 1,
    name: 'Electronic'
  }, {
    id: 2,
    name: 'Chiptune'
  }]

  const genreStm = db.prepare('INSERT INTO genres VALUES (?,?)')
  genres.forEach(({ id, name }) => {
    console.log('Creating:', JSON.stringify({ id, name }))
    genreStm.run(id, name)
  })
  genreStm.finalize()

  const songs = [{
    artist: 'Bisou',
    album: 'Music Spaceshift',
    song: 'Bad Flower',
    genreId: 1
  }, {
    artist: 'Bisou',
    album: 'Music Spaceshift',
    song: 'Panda',
    genreId: 1
  }, {
    artist: 'Bisou',
    album: 'Music Spaceshift',
    song: 'Industrial',
    genreId: 1
  }, {
    artist: 'Bisou',
    album: 'Haumea',
    song: 'Moon Answer',
    genreId: 1
  }, {
    artist: 'Komiku',
    album: `It's time for adventure`,
    song: 'La Citadelle',
    genreId: 2
  }, {
    artist: 'Komiku',
    album: `It's time for adventure`,
    song: 'Bleu',
    genreId: 2
  }]

  const stm = db.prepare('INSERT INTO songs VALUES (?,?,?,?,?)')
  songs.forEach((song, idx) => {
    console.log('Creating:', JSON.stringify(song))
    stm.run(idx, song.artist, song.album, song.song, song.genreId)
  })
  stm.finalize()
})
db.close()

function done (err) {
  if (err) {
    throw err
  }
}
