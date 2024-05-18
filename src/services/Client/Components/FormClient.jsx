import React from "react";
import SendClient from "./SendClient";

export default function FormClient() {
  return (
    <div>
      <h1 className="container mt-3 mb-3">Nuevo Cliente</h1>
      {/* FORM CLIENT */}
      <SendClient />
    </div>
  );
}
