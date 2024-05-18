import React, { useEffect, useState } from 'react'
import { fetchGetClient } from '../../Api/api';
import { Link } from 'react-router-dom';


export default function DirectoryClient() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const result = await fetchGetClient();
            console.log(result);
            setData(result);
        };
        getData();
    }, []);

    // const handleEditClient = (id) => {
    //     history.push(`/edit-client/${id}`);
    // };

    return (
        <div className="container">
            <h1>Directorio de Clientes</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre Comercial</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nombre_comercial}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.correo}</td>
                            <td>
                                <button> <Link to={`/edit-client/${cliente.id}`}>Editar Cliente</Link></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
