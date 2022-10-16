import React, { Component } from 'react';
import { GlobalStoreContext } from '../store'
import { useContext } from 'react'

const DeleteSongModal = () => {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    let className = "modal"
    if (store.songMarkedForDeletion) {
        name = store.songMarkedForDeletion.song.title;
        className += " is-visible"
    }
    return (
        <div 
            className= {className} 
            id="delete-song-modal" 
            data-animation="slideInOutLeft">
                <div className="modal-root" id='verify-delete-song-root'>
                    <div className="modal-north">
                        Delete Song?
                    </div>
                    <div className="modal-center">
                        <div className="modal-center-content">
                            Are you sure you wish to remove {name} from the playlist?
                        </div>
                    </div>
                    <div className="modal-south">
                        <input type="button" 
                            id="delete-song-confirm-button" 
                            className="modal-button" 
                            onClick={() =>store.addDeleteSongTransaction(store.songMarkedForDeletionIndex)}
                            value='Confirm' />
                        <input type="button" 
                            id="delete-song-cancel-button" 
                            className="modal-button" 
                            onClick={() => store.hideDeleteSongModal()}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
}
export default DeleteSongModal;