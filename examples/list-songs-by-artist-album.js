'use strict'

const SongsDb = require('../')
const artist = process.argv[2] || 'Bisou'
const album = process.argv[3] || 'Haumea'

;(async () => {
  try {
    const db = new SongsDb()
    db.on('error', err => {
      console.error(err.message)
    })
    const results = await db.listSongsByArtistAndAlbum(artist, album)
    console.log(JSON.stringify(results, null, 2))
  } catch (err) {
    console.error(err.message)
  }
})()
