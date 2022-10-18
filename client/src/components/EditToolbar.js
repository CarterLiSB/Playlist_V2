import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "playlister-button";
    let enabledAddSong = "playlister-button";
    let enabledUndo = "playlister-button";
    let enabledRedo = "playlister-button";
    let enabledClose = "playlister-button";


    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }

    function handleAddSong() {
        store.addAddSongTransaction();
    }
    
    let canAddSong = store.currentList !== null;
    let canUndo = store.getTPS().hasTransactionToUndo();
    let canRedo = store.getTPS().hasTransactionToRedo();
    let canClose = store.currentList !== null;
    let canAddList = store.currentList === null;

    //console.log(store.currentList);
    //console.log("toolbar " + store.songMarkedForDeletion);
    // console.log(canAddList);
    // console.log("Add: " + canAddSong);
    // console.log("Undo: " + canUndo);
    // console.log("Redo: " + canRedo);
    // console.log("Close: " + canClose);
    
    if(store.songMarkedForEdit !== undefined && store.songMarkedForEdit !== null || store.songMarkedForDeletion !== undefined && store.songMarkedForDeletion !== null || canAddList){
        //console.log("All False")
        canAddSong = false;
        canUndo = false;
        canRedo = false;
        canClose = false;
    }

    if(!canAddSong){
        enabledAddSong += "-disabled"
    }
    if(!canUndo){
        enabledUndo += "-disabled"
    }
    if(!canRedo){
        enabledRedo += "-disabled"
    }
    if(!canClose){
        enabledClose += "-disabled"
    }

    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={!canAddSong}
                value="+"
                className={enabledAddSong}
                onClick = {handleAddSong}
            />
            <input
                type="button"
                id='undo-button'
                disabled={!canUndo}
                value="⟲"
                className={enabledUndo}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={!canRedo}
                value="⟳"
                className={enabledRedo}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={!canClose}
                value="&#x2715;"
                className={enabledClose}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;