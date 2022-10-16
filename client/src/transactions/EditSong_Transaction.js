import jsTPS_Transaction from "../common/jsTPS.js"

export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(store, oldSong, newSong, index) {
        super();
        this.store = store;
        this.oldSong = oldSong;
        this.newSong = newSong;
        this.index = index;
    }

    doTransaction() {
        this.store.editSong(this.newSong, this.index);
    }
    
    undoTransaction() {
        this.store.editSong(this.oldSong, this.index);
    }
}