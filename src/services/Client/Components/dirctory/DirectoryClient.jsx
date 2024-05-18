import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { fetchGetClient } from "../../Api/api";

export default function DirectoryClient() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 5;

  useEffect(() => {
    const getData = async () => {
      const result = await fetchGetClient();
      setData(result);
      setFilteredData(result);
      setTotalPages(Math.ceil(result.length / itemsPerPage));
    };
    getData();
  }, []);

  useEffect(() => {
    const filtered = data.filter(cliente => 
      cliente.nombre_comercial.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cliente.telefono.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cliente.correo.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1); // Reset to first page after search
  }, [searchQuery, data]);

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleDelete = (id) => {
    const updatedData = data.filter(cliente => cliente.id !== id);
    setData(updatedData);
    setFilteredData(updatedData.filter(cliente => 
      cliente.nombre_comercial.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cliente.telefono.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cliente.correo.toLowerCase().includes(searchQuery.toLowerCase())
    ));
    setTotalPages(Math.ceil(updatedData.length / itemsPerPage));
    if (currentPage > Math.ceil(updatedData.length / itemsPerPage)) {
      setCurrentPage(Math.ceil(updatedData.length / itemsPerPage));
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Directorio de Clientes</h1>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre, teléfono o correo"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Nombre Comercial</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {selectedData.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre_comercial}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.correo}</td>
                <td>
                  <Link to={`/edit-client/${cliente.id}`} className="btn btn-primary mx-1">
                    Editar
                  </Link>
                  <button
                    className="btn btn-danger mx-1"
                    onClick={() => handleDelete(cliente.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {[...Array(totalPages)].map((_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageClick(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
