/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const router = express.Router()

router.post('/playlist', PlaylistController.createPlaylist)
router.get('/playlist/:id', PlaylistController.getPlaylistById)
router.get('/playlists', PlaylistController.getPlaylists)
router.get('/playlistpairs', PlaylistController.getPlaylistPairs)
router.delete('/playlist/:id', PlaylistController.deletePlaylist)
router.post('/playlist/:id/addSong/:id', PlaylistController.addSong)
router.delete('/playlist/:id/undoAddSong/:id', PlaylistController.undoAddSong)
router.delete('/playlist/:id/deleteSong/:index', PlaylistController.deleteSong)
router.post('/playlist/:id/undoDeleteSong', PlaylistController.undoDeleteSong)
router.put('/playlist/:id/editSong', PlaylistController.editSong)
router.put('/playlist/:id/moveSong', PlaylistController.moveSong)
router.put('/playlist/:id/updatePlaylistById', PlaylistController.updatePlaylistById)

module.exports = router