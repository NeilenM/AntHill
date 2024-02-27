// pages/api/eventos/uploadPhotos.js
import { db } from "../../../firebase/client";
import { updateDoc, doc } from "firebase/firestore";
import fs from "fs";
import path from "path";

export default async (req, res) => {
  if (req.method === "PUT") {
    const { id } = req.body;

    try {
      const eventoRef = doc(db, "eventos", id);

      // Procesar cada archivo individualmente
      const uploadedFiles = Array.isArray(req.files.files) ? req.files.files : [req.files.files];
      const fileNames = [];

      uploadedFiles.forEach((file) => {
        const oldPath = file.path;
        const ext = path.extname(file.name);
        const newPath = path.join("./uploads", `${Date.now()}${ext}`); // Directorio donde guardar las imágenes

        fs.renameSync(oldPath, newPath);
        fileNames.push(newPath); // Guarda el nombre de archivo para futuras referencias
      });

      // Actualizar el documento en la base de datos con los nombres de archivo
      await updateDoc(eventoRef, {
        fotos: fileNames,
      });

      console.log("Id del evento:", id);
      return res.status(200).json({ message: "Evento actualizado con éxito" });
    } catch (error) {
      console.error("Error al actualizar el evento:", error);
      return res.status(500).json({ error: "Error al actualizar el evento" });
    }
  } else {
    res.status(405).end(); // Método no permitido
  }
};
