import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

import { fetchPostClient } from "../Api/api";
import ToastClient from "./alerts/ToastClient";

export default function SendClient() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
    });
  
    const [showToast, setShowToast] = useState({
      name: false,
      email: false,
      phone: false,
      success: false,
    });
  
    const [toastMessage, setToastMessage] = useState({
      name: '',
      email: '',
      phone: '',
      success: '',
    });
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
  
    // FORM HANDLE CHANGE
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      if (name === 'phone' && (value.length > 10 || !/^\d*$/.test(value))) {
        return;
      }
  
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
  
      // Validation for each field
      if (!formData.name) {
        newShowToast.name = true;
        newToastMessage.name = 'El nombre es obligatorio';
        hasError = true;
      }
  
      if (!formData.email) {
        newShowToast.email = true;
        newToastMessage.email = 'El correo es obligatorio';
        hasError = true;
      } else if (!emailRegex.test(formData.email)) {
        newShowToast.email = true;
        newToastMessage.email = 'El correo no es válido';
        hasError = true;
      }
  
      if (!formData.phone) {
        newShowToast.phone = true;
        newToastMessage.phone = 'El teléfono es obligatorio';
        hasError = true;
      } else if (!phoneRegex.test(formData.phone)) {
        newShowToast.phone = true;
        newToastMessage.phone = 'El teléfono debe tener 10 dígitos numéricos';
        hasError = true;
      }
  
      if (hasError) {
        setShowToast(newShowToast);
        setToastMessage(newToastMessage);
        return;
      }
  
      const data = {
        nombre_comercial: formData.name,
        correo: formData.email,
        telefono: formData.phone,
      };
  
      console.log(data);
  
      fetchPostClient(data)
        .then((response) => {
          console.log('Respuesta del servidor:', response);
          setShowToast({ ...showToast, success: true });
          setToastMessage({ ...toastMessage, success: 'Formulario enviado correctamente' });
        })
        .catch((error) => {
          console.error('Error al enviar los datos:', error);
          setShowToast({ ...showToast, success: true });
          setToastMessage({ ...toastMessage, success: 'Error al enviar el formulario' });
        });
    };
  
    const renderToast = (type) => (
      <ToastClient
        show={showToast[type]}
        message={toastMessage[type]}
        onClose={() => setShowToast({ ...showToast, [type]: false })}
      />
    );
  
    return (
      <Container>
        <Form onSubmit={handleSubmit}>
          {[
            { name: 'name', label: 'Nombre del Comercial' },
            { name: 'email', label: 'Email' },
            { name: 'phone', label: 'Teléfono' }
          ].map((field, index) => (
            <Form.Group controlId={`form${field.name}`} key={index} className="mt-3">
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type={field.name === 'phone' ? 'text' : field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={`Ingresa tu ${field.label.toLowerCase()}`}
                required
              />
            </Form.Group>
          ))}
  
          <Button variant="primary" type="submit" className="mt-4">
            Enviar
          </Button>
        </Form>
  
        {/* ALERT TOAST */}
        {renderToast('name')}
        {renderToast('email')}
        {renderToast('phone')}
        {renderToast('success')}
      </Container>
    );
  }