import jsTPS_Transaction from "../common/jsTPS.js"

export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(store, index) {
        super();
        this.store = store;
        this.index = index;
        this.oldSong = store.currentList.songs[index]
    }

    doTransaction() {
        this.store.editSong(this.index);
    }
    
    undoTransaction() {
        this.store.editSong(this.oldSong, this.index);
    }
}