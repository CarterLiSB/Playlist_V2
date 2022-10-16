const Playlist = require('../models/playlist-model')
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/
createPlaylist = (req, res) => {
    const body = req.body;
    console.log("createPlaylist body: " + body);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    const playlist = new Playlist(body);
    console.log("playlist: " + JSON.stringify(body));
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    playlist
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                playlist: playlist,
                message: 'Playlist Created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Playlist Not Created!',
            })
        })
}
getPlaylistById = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, playlist: list })
    }).catch(err => console.log(err))
}
getPlaylists = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
getPlaylistPairs = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err})
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Playlists not found'})
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in playlists) {
                let list = playlists[key];
                let pair = {
                    _id : list._id,
                    name : list.name
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

deletePlaylist = (req, res) => {
    //console.log(req);
    Playlist.deleteOne({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true})
    })
}

addSong = (req, res) => {
    //console.log("hi")
    Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        let defaultSong = {
            title: "Untitled",
            artist: "Unknown",
            youTubeId: "dQw4w9WgXcQ"
        }
        playlist.songs.push(defaultSong)
        playlist.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                playlist: playlist,
                message: 'New Song Added!',
            })
        })
        .catch(error => {
            return res.status(500).json({
                error,
                message: 'New Song Not Added!',
            })
        })
    })
}

undoAddSong = (req, res) => {
    //console.log("hi")
    Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        playlist.songs.pop()
        playlist.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                playlist: playlist,
                message: 'Undid Add Song',
            })
        })
        .catch(error => {
            return res.status(500).json({
                error,
                message: 'Could Not Undo Add Song!',
            })
        })
    })
}

deleteSong = (req, res) => {
    Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        const songs = playlist.songs
        songs.splice(req.params.index, 1)
        playlist.songs = songs
        playlist.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                playlist: playlist,
                message: 'Deleted Song',
            })
        })
        .catch(error => {
            return res.status(500).json({
                error,
                message: 'Could not delete song',
            })
        })
    })
}

undoDeleteSong = (req, res) => {
    Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        const index = req.body.index
        const song = req.body.song

        playlist.songs.splice(index, 0, song)

        playlist.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                playlist: playlist,
                message: 'Undid Delete Song',
            })
        })
        .catch(error => {
            return res.status(500).json({
                error,
                message: 'Could not undo delete song!',
            })
        })
    })
}

module.exports = {
    createPlaylist,
    getPlaylists,
    getPlaylistPairs,
    getPlaylistById,
    deletePlaylist,
    addSong,
    undoAddSong,
    deleteSong,
    undoDeleteSong
}