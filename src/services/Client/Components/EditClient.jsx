import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditClient() {
  const [client, setClient] = useState(null);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios
      .get(
        `https://venues-anti-permitted-karen.trycloudflare.com/api/v1/cliente/${id}/`
      )
      .then((response) => {
        console.log(response);
        setClient(response.data);
      })
      .catch((error) => {
        console.error("Error fetching client:", error);
      });
  }, [id]);

  return (
    <div className="container">
      {client ? (
        <div>
          <h2>Edit Client {client.id}</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="nombreComercial" className="form-label">
                Nombre Comercial
              </label>
              <input
                type="text"
                className="form-control"
                id="nombreComercial"
                defaultValue={client.nombre_comercial}
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
                defaultValue={client.telefono}
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
                defaultValue={client.correo}
              />
            </div>
            {/* Agrega más campos del cliente según tu modelo */}
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
