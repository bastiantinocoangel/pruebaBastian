import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import EditClient from "./services/Client/Components/EditClient";
import FormClient from "./services/Client/Components/FormClient";
import DirectoryClient from "./services/Client/Components/dirctory/DirectoryClient";

function App() {
  return (
    <Router>
      <Navbar />

      {/* ROUTER  */}
      <Routes>
        <Route path="/" element={<DirectoryClient />}></Route>
        <Route path="/nuevo-cliente" element={<FormClient />}></Route>
        <Route path="/edit-client/:id" element={<EditClient />} />
      </Routes>
    </Router>
  );
}

export default App;
