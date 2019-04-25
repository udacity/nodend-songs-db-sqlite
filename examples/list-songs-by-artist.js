'use strict'

const SongsDb = require('../songs-db')
const artist = process.argv[2] || 'Bisou'

;(async () => {
  try {
    const db = new SongsDb()
    db.on('error', err => {
      console.error(err.message)
    })
    const results = await db.listSongsByArtist(artist)
    console.log(JSON.stringify(results, null, 2))
  } catch (err) {
    console.error(err.message)
  }
})()
