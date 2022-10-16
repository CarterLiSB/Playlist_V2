import React, { Component } from 'react';
import { GlobalStoreContext } from '../store'
import { useContext } from 'react'


// onClick={() => store.addEditSongTransaction(store.songMarkedForEdit, store.songMarkedForEditIndex,)}
const EditSongModal = () => {
        const {store} = useContext(GlobalStoreContext)
        let className = "modal"
        if (store.songMarkedForEdit != null) {
            className += " is-visible"
        }
        return (
            <div 
                className={className} 
                id="edit-song-modal" 
                data-animation="slideInOutLeft">
                    <div className="modal-root" id='verify-edit-song-root'>
                        <div className="modal-north">
                            Edit Song
                        </div>
                        <div className="modal-center">
                            <div className="modal-center-content">
                            <div>Title: <input type = "text" id = "input-title"></input></div>
                            <div>Artist: <input type = "text" id = "input-artist"></input></div>
                            <div>Youtube ID: <input type = "text" id = "input-id"></input></div>
                            </div>
                        </div>
                        <div className="modal-south">
                            <input type="button" 
                                id="edit-song-confirm-button" 
                                className="modal-button" 
                                onClick={() => {
                                    let title = document.getElementById("input-title").value;
                                    let artist = document.getElementById("input-artist").value;
                                    let youTubeId = document.getElementById("input-id").value;
                                    let newSong = {title, artist, youTubeId}
                                    store.addEditSongTransaction(store.songMarkedForEdit, newSong, store.songMarkedForEditIndex)
                                }
                                }
                                value='Confirm' />
                            <input type="button" 
                                id="edit-song-cancel-button" 
                                className="modal-button" 
                                onClick={store.hideEditSongModal}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
    }
    export default EditSongModal;