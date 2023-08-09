/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import "./style.css";

class Alert extends Component {
    render() {
        const { type, message } = this.props;
        return <div className={`col-md-6 alert position-absolute z-3 alert-${type}`}>{message}</div>;
    }
}

export default Alert;
