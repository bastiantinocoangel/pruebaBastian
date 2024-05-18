import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

import { fetchPostClient } from "../Api/api";
import ToastClient from "./alerts/ToastClient";

export default function SendClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [showToast, setShowToast] = useState({
    name: false,
    email: false,
    phone: false,
  });
  const [toastMessage, setToastMessage] = useState({
    name: '',
    email: '',
    phone: '',
  });


//   FORM HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;
    const newShowToast = { ...showToast };
    const newToastMessage = { ...toastMessage };

    // SHOW MSG ALERT
    if (!formData.name) {
      newShowToast.name = true;
      newToastMessage.name = 'El nombre es obligatorio';
      hasError = true;
    }

    if (!formData.email) {
      newShowToast.email = true;
      newToastMessage.email = 'El correo es obligatorio';
      hasError = true;
    }

    if (!formData.phone) {
      newShowToast.phone = true;
      newToastMessage.phone = 'El teléfono es obligatorio';
      hasError = true;
    }

    if (hasError) {
      setShowToast(newShowToast);
      setToastMessage(newToastMessage);
      return;
    }


    const data = {
        nombre_comercial: formData?.name,
        correo: formData?.email,
        telefono: formData?.phone,
    };

    console.log(data);

    fetchPostClient(data)
      .then((response) => {
        console.log("Respuesta del servidor:", response);
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
      });
  };

  return (
    <Container>
      <h1>Formulario de Contacto</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formname">
          <Form.Label>name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ingresa tu name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formemail">
          <Form.Label>email electrónico</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingresa tu email electrónico"
            required
          />
        </Form.Group>

        <Form.Group controlId="formemail">
          <Form.Label>phone</Form.Label>
          <Form.Control
            type="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Ingresa tu phone electrónico"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>

      {/* ALERT TOAST */}
      <ToastClient
        show={showToast.name}
        message={toastMessage.name}
        onClose={() => setShowToast({ ...showToast, name: false })}
      />
      <ToastClient
        show={showToast.email}
        message={toastMessage.email}
        onClose={() => setShowToast({ ...showToast, email: false })}
      />
      <ToastClient
        show={showToast.phone}
        message={toastMessage.phone}
        onClose={() => setShowToast({ ...showToast, phone: false })}
      />
    </Container>
  );
}
