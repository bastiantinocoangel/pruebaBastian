import React from "react";
import { Toast } from "react-bootstrap";

export default function ToastClient(props) {
  const { show, message, onClose } = props;

  return (
    <Toast
      onClose={onClose}
      show={show}
      delay={3000}
      autohide
      className="toast-container"
    >
      <Toast.Header closeButton={false} className="toast-header">
        <strong className="mr-auto">Notification</strong>
      </Toast.Header>
      <Toast.Body className="toast-body">{message}</Toast.Body>
    </Toast>
  );
}
