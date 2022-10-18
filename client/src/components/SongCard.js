import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [isDragging, setIsDragging] = useState(false)
    const [draggedTo, setIsDraggedTo] = useState(false)
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

    let handleDragStart = (event) => {
        event.dataTransfer.setData("song", event.target.id);
        setIsDragging(true);
    }

    let handleDragOver = (event) => {
        event.preventDefault();
        setIsDraggedTo(true);
    }

    let handleDragEnter = (event) => {
        event.preventDefault();
        setIsDraggedTo(true);
    }

    let handleDragLeave = (event) => {
        event.preventDefault();
        setIsDraggedTo(false);
    }

    let handleDrop = (event) => {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = parseInt(targetId.substring(target.id.indexOf("-") + 1));
        let sourceId = event.dataTransfer.getData("song");
        sourceId = parseInt(sourceId.substring(sourceId.indexOf("-") + 1));
        
        setIsDragging(false);
        setIsDraggedTo(false);
        store.addMoveSongTransaction(sourceId, targetId)
    }

    return (
        <div
            key={index}
            id={'song-' + index}
            className={cardClass}
            onDoubleClick = {handleEditSong}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable={true}
        >
            {index + 1}.
            <a
                id={'songlink-' + index}
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