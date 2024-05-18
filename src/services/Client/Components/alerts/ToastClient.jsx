import React from "react";
import { Toast } from "react-bootstrap";

export default function ToastClient(props) {
  const { show, message, onClose } = props;

  console.log("ESTA ENTRANDO", show, message, onClose);

  return (
    <Toast
      onClose={onClose}
      show={show}
      delay={3000}
      autohide
      style={{
        position: "absolute",
        top: 20,
        right: 20,
      }}
    >
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}
