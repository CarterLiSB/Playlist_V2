import jsTPS_Transaction from "../common/jsTPS.js"

export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(store, index) {
        super();
        this.store = store;
        this.index = index;
        this.oldSong = store.currentList.songs[index]
    }

    doTransaction() {
        this.store.deleteSong(this.index);
    }
    
    undoTransaction() {
        this.store.undoDeleteSong(this.oldSong, this.index);
    }
}