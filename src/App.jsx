import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Client from "./components/Client";
import EditClient from "./services/Client/Components/EditClient";
import FormClient from "./services/Client/Components/FormClient";
import DirectoryClient from "./services/Client/Components/dirctory/DirectoryClient";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Client">Cliente</Link>
          </li>

          <li>
            <Link to="/nuevo-cliente">Nuevo Cliente</Link>
          </li>
        </ul>
      </nav>

      {/* ROUTER  */}
      <Routes>
        <Route path="/" element={<DirectoryClient />}></Route>
        <Route path="/Client" element={<Client />}></Route>
        <Route path="/nuevo-cliente" element={<FormClient />}></Route>
        <Route path="/edit-client/:id" element={<EditClient />} /> 
      </Routes>
    </Router>
  );
}

export default App;
