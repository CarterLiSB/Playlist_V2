import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
import AddSong_Transaction from '../transactions/AddSong_Transaction';
import DeleteSong_Transaction from '../transactions/DeleteSong_Transaction';
import EditSong_Transaction from '../transactions/EditSong_Transaction';

// import DeleteSong_Transaction from '../transactions/DeleteSong_Transaction.js'
// import EditSong_Transaction from '../transactions/EditSong_Transaction.js'
// import MoveSong_Transaction from '../transactions/MoveSong_Transaction.js'
export const GlobalStoreContext = createContext({});

/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    DELETE_LIST: "DELETE_LIST",
    HIDE_DELETE_LIST_MODAL: "HIDE_DELETE_LIST_MODAL",
    ADD_SONG: "ADD_SONG",
    UNDO_ADD_SONG: "UNDO_ADD_SONG",
    MARK_SONG_FOR_DELETION: "MARK_SONG_FOR_DELETION",
    DELETE_SONG: "DELETE_SONG",
    UNDO_DELETE_SONG: "UNDO_DELETE_SONG",
    HIDE_DELETE_SONG_MODAL: "HIDE_DELETE_SONG_MODAL",
    MARK_SONG_FOR_EDIT: "MARK_SONG_FOR_EDIT",
    EDIT_SONG: "EDIT_SONG",
    HIDE_EDIT_SONG_MODAL: "HIDE_EDIT_SONG_MODAL"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                const pairs = store.idNamePairs;
                pairs.push({_id: payload._id, name: payload.name})
                return setStore({
                    idNamePairs: pairs,
                    currentList: payload,
                    newListCounter: store.newListCounter++,
                    listNameActive: false
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: payload
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true
                });
            }
            case GlobalStoreActionType.DELETE_LIST:{
                return setStore(prev => ({
                    ...prev,
                    idNamePairs: payload
                }))
            }

            case GlobalStoreActionType.HIDE_DELETE_LIST_MODAL:{
                return setStore(prev => ({
                    ...prev,
                    listMarkedForDeletion: null
                }))
            }

            case GlobalStoreActionType.ADD_SONG:{
                return setStore(prev => ({
                    ...prev,
                    currentList: payload
                }))
            }

            case GlobalStoreActionType.UNDO_ADD_SONG:{
                return setStore(prev => ({
                    ...prev,
                    currentList: payload
                }))
            }

            case GlobalStoreActionType.MARK_SONG_FOR_DELETION:{
                return setStore(prev => ({
                    ...prev,
                    songMarkedForDeletion: payload.idNamePair,
                    songMarkedForDeletionIndex: payload.index
                }))
            }

            case GlobalStoreActionType.DELETE_SONG:{
                return setStore(prev => ({
                    ...prev,
                    currentList: payload
                }))
            }

            case GlobalStoreActionType.UNDO_DELETE_SONG:{
                return setStore(prev => ({
                    ...prev,
                    currentList: payload
                }))
            }

            case GlobalStoreActionType.HIDE_DELETE_SONG_MODAL:{
                return setStore(prev => ({
                    ...prev,
                    songMarkedForDeletion: null
                }))
            }

            case GlobalStoreActionType.MARK_SONG_FOR_EDIT:{
                return setStore(prev => ({
                    ...prev,
                    songMarkedForEdit: payload.song,
                    songMarkedForEditIndex: payload.index
                }))
            }

            case GlobalStoreActionType.EDIT_SONG:{
                return setStore(prev => ({
                    ...prev,
                    currentList: payload
                }))
            }

            case GlobalStoreActionType.HIDE_EDIT_SONG_MODAL:{
                return setStore(prev => ({
                    ...prev,
                    songMarkedForEdit: null
                }))
            }


            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        //console.log(store.newListCounter);
        tps.clearAllTransactions();
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    store.createNewList = function () {
        async function asyncCreateNewList(){
            //Request: name, songs
            let request = {name: "Untitled" + store.newListCounter, songs: []};
            let response = await api.createNewPlaylist(request);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: response.data.playlist
                })
                store.setCurrentList(response.data.playlist._id);
            }
        }
        asyncCreateNewList();
    }

    store.markListForDeletion = function(idNamePair) {
        storeReducer({
            type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            payload: idNamePair
        })
    }

    store.deleteList = function(key) {
        //console.log(key);
        store.hideDeleteListModal();
        async function asyncDeleteList(id){
            let response = await api.deletePlaylist(id)
            let newIdNamePairs= store.idNamePairs.filter((idNamePair) => {
                return (idNamePair !== key);
            });
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.DELETE_LIST,
                    payload: newIdNamePairs
                })
            }
        }
        asyncDeleteList(key._id);
    }

    store.hideDeleteListModal = function() {
        storeReducer({
            type: GlobalStoreActionType.HIDE_DELETE_LIST_MODAL
        })
    }

    store.addAddSongTransaction = function() {
        //console.log(jsTPS)
        //console.log(AddSong_Transaction)
        tps.addTransaction(new AddSong_Transaction(store));
    }

    store.addSong = function() {
        async function asyncAddSong(){
            let response = await api.addSong(store.currentList._id)
            if(response.data.success){
                storeReducer({
                    type: GlobalStoreActionType.ADD_SONG,
                    payload: response.data.playlist
                })
            }
        }
        asyncAddSong();
    }

    store.undoAddSong = function() {
        async function asyncUndoAddSong(){
            let response = await api.undoAddSong(store.currentList._id)
            if(response.data.success){
                storeReducer({
                    type: GlobalStoreActionType.UNDO_ADD_SONG,
                    payload: response.data.playlist
                })
            }
        }
        asyncUndoAddSong();
    }

    store.markSongForDeletion = function(idNamePair, index) {
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_DELETION,
            payload: {idNamePair, index}
        })
    }

    store.addDeleteSongTransaction = function(index){
        tps.addTransaction(new DeleteSong_Transaction(store, index));
    }

    store.deleteSong = function(index){
        store.hideDeleteSongModal();
        async function asyncDeleteSong(){
            let response = await api.deleteSong(store.currentList._id, index)
            if(response.data.success){
                storeReducer({
                    type: GlobalStoreActionType.DELETE_SONG,
                    payload: response.data.playlist
                })
            }
        }
        asyncDeleteSong();
    }

    store.undoDeleteSong = function(song, index){
        async function asyncUndoDeleteSong(){
            let body = {song, index}
            let response = await api.undoDeleteSong(store.currentList._id, body)
            if(response.data.success){
                storeReducer({
                    type: GlobalStoreActionType.UNDO_DELETE_SONG,
                    payload: response.data.playlist
                })
            }
        }
        asyncUndoDeleteSong();
    }

    store.hideDeleteSongModal = function() {
        storeReducer({
            type: GlobalStoreActionType.HIDE_DELETE_SONG_MODAL
        })
    }

    store.markSongForEdit = function(song, index) {
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_EDIT,
            payload: {song, index}
        })
    }

    store.addEditSongTransaction = function(oldSong, newSong, index){
        tps.addTransaction(new EditSong_Transaction(store, oldSong, newSong, index));
    }

    store.editSong = function(index){
        store.hideEditSongModal();
        async function asyncEditSong(){
            let response = await api.editSong(store.currentList._id, index)
            if(response.data.success){
                storeReducer({
                    type: GlobalStoreActionType.EDIT_SONG,
                    payload: response.data.playlist
                })
            }
        }
        asyncEditSong();
    }

    store.hideEditSongModal = function() {
        storeReducer({
            type: GlobalStoreActionType.HIDE_EDIT_SONG_MODAL
        })
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}