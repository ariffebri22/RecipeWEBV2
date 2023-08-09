/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import "./style.css";

class Modal extends Component {
    render() {
        return (
            <>
                <div className="modal fade" id="logoutModal" aria-labelledby="logoutModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">Are you sure?</div>
                            <div className="modal-footer d-block mt-4">
                                <button type="button" className="btn btn-danger btnYes text-light">
                                    Yes
                                </button>
                                <button type="button" className="btn btn-secondary btnCancel text-light" data-bs-dismiss="modal">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Modal;
