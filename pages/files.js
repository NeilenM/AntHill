// pages/upload.js
import { useState } from "react";

export default function Upload() {
  const [files, setFiles] = useState([]);
  const id = "SVY7PlBiT1HX3n8eaUXx"; // ID del evento

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("/api/eventos/uploadPhotos", {
        method: "PUT",
        body: formData,
        headers: {
          // Necesitas especificar el Content-Type como multipart/form-data
          // para que el backend pueda entender que se están enviando archivos
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        console.log("Archivos subidos correctamente");
      } else {
        console.error("Error al subir archivos");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div>
      <h1>Subir Archivos</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} multiple />
        <button type="submit">Subir</button>
      </form>
    </div>
  );
}

