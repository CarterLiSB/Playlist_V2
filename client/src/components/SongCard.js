import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const idNamePair = props;
    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";

    function handleDelete(event) {
        event.stopPropagation();
        store.markSongForDeletion(idNamePair, index);
    }

    function handleEditSong(event) {
        event.stopPropagation();
        store.markSongForEdit(song, index);
    }

    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDoubleClick = {handleEditSong}
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                onClick = {handleDelete}
                value={"\u2715"}
            />
        </div>
    );
}

export default SongCard;