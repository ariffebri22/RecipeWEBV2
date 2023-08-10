/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";

class Modal extends Component {
    render() {
        const { title, message, onClose } = this.props;

        return (
            <div className="modal fade" id="noticeModal" tabIndex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">{title}</div>
                        <p className="mt-3">{message}</p>
                        <div className="modal-footer d-block mt-4">
                            <button type="button" className="btn btn-warning btnYes text-light" data-bs-dismiss="modal" onClick={onClose}>
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
