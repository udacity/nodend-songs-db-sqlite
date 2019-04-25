'use strict'

const SongsDb = require('../')

;(async () => {
  try {
    const db = new SongsDb()
    db.on('error', err => {
      console.error(err.message)
    })
    const song = {
      artist: 'Komiku',
      album: 'The Binge Watchers',
      song: 'Hope'
    }
    const results = await db.createSong(song)
    console.log(JSON.stringify(results, null, 2))
  } catch (err) {
    console.error(err.message)
  }
})()
