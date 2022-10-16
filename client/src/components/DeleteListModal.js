import React, { Component} from 'react';
import { GlobalStoreContext } from '../store'
import { useContext } from 'react'

const DeleteListModal = () => {
        const { store } = useContext(GlobalStoreContext);
        let name = "";
        let className = "modal"
        if (store.listMarkedForDeletion) {
            name = store.listMarkedForDeletion.name;
            className += " is-visible"
        }
        return (
            <div 
                className= {className} 
                id="delete-list-modal" 
                data-animation="slideInOutLeft">
                    <div className="modal-root" id='verify-delete-list-root'>
                        <div className="modal-north">
                            Delete playlist?
                        </div>
                        <div className="modal-center">
                            <div className="modal-center-content">
                                Are you sure you wish to permanently delete the {name} playlist?
                            </div>
                        </div>
                        <div className="modal-south">
                            <input type="button" 
                                id="delete-list-confirm-button" 
                                className="modal-button" 
                                onClick={() =>store.deleteList(store.listMarkedForDeletion)}
                                value='Confirm' />
                            <input type="button" 
                                id="delete-list-cancel-button" 
                                className="modal-button" 
                                onClick={() => store.hideDeleteListModal()}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
}
export default DeleteListModal;