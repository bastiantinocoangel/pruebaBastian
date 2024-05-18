import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import ToastClient from "./alerts/ToastClient";
import { getClientById, updateClient } from "../Api/api";

export default function EditClient() {
  const [client, setClient] = useState(null);
  const [formState, setFormState] = useState({});
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({
    type: '', 
    message: '',
    visible: false,
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const data = await getClientById(id);
        setClient(data);
        setFormState({
          nombre_comercial: data.nombre_comercial,
          telefono: data.telefono,
          correo: data.correo,
          // Agrega más campos si es necesario
        });
      } catch (error) {
        console.error('Error fetching client:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    let toastType = '';
    let toastMessage = '';

    // Validaciones
    if (!formState.nombre_comercial) {
      toastType = 'name';
      toastMessage = 'El nombre es obligatorio';
      hasError = true;
    } else if (!formState.correo) {
      toastType = 'email';
      toastMessage = 'El correo es obligatorio';
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.correo)) {
      toastType = 'email';
      toastMessage = 'El correo no es válido';
      hasError = true;
    } else if (!formState.telefono) {
      toastType = 'phone';
      toastMessage = 'El teléfono es obligatorio';
      hasError = true;
    } else if (!/^\d{10}$/.test(formState.telefono)) {
      toastType = 'phone';
      toastMessage = 'El teléfono debe tener 10 dígitos numéricos';
      hasError = true;
    }

    if (hasError) {
      setToast({ type: toastType, message: toastMessage, visible: true });
      return;
    }

    const data = {
      nombre_comercial: formState.nombre_comercial,
      correo: formState.correo,
      telefono: formState.telefono,
    };

    try {
      const updatedClient = await updateClient(id, data);
      setClient(updatedClient);
      setToast({ type: 'success', message: 'Cliente actualizado correctamente', visible: true });
    } catch (error) {
      console.error('Error updating client:', error);
      setToast({ type: 'error', message: 'Error al actualizar el cliente', visible: true });
    }
  };

  const handleToastClose = () => {
    setToast((prevState) => ({
      ...prevState,
      visible: false,
    }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!client) {
    return <p>Cliente no encontrado.</p>;
  }

  return (
    <div className="container mt-3">
      <h2>Editar Cliente #{client.id}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre_comercial" className="form-label">
            Nombre Comercial
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre_comercial"
            value={formState.nombre_comercial || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">
            Teléfono
          </label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            value={formState.telefono || ''}
            onChange={handleInputChange}
            maxLength={10} // Limita la entrada a 10 dígitos
          />
        </div>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">
            Correo
          </label>
          <input
            type="email"
            className="form-control"
            id="correo"
            value={formState.correo || ''}
            onChange={handleInputChange}
          />
        </div>
        {/* Agrega más campos si es necesario */}
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </form>

      {/* Notificaciones Toast */}
      <ToastClient show={toast.visible} message={toast.message} onClose={handleToastClose} />
    </div>
  );
}
