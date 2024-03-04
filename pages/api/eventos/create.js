// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "../../../firebase/client";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";

export default async function handler(req, res) {

  // --------------  Función para agregar un evento --------------

  if (req.method === "POST") {
    const { fechaInicio, fechaFin, hora, artistas, banner, locacion, descripcion, fotosURL} = req.body;

    try {
      const docRef = await addDoc(collection(db, "eventos"), {
        fechaInicio: fechaInicio || null,
        fechaFin: fechaFin || null,
        hora: hora || null,
        locacion: locacion|| null,
        artistas: artistas|| null,
        descripcion: descripcion|| null,
        fotosURL:  fotosURL || null,
        banner: banner || null
      });
      return res.status(201).json({ message: "Evento creado exitosamente." });
    } catch (error) {
      throw error;
    }
  }
  
  
  
  // -------------- Función para agregar fotos a un evento -------------- VER
  
  // if  (req.method === "PUT") {
  //   const { id, fotos } = req.body;

  //   try {
  //     const eventoRef = doc(db, "eventos", id);
  //     await updateDoc(eventoRef, {
  //       fotos 
  //     });

  //     console.log("Id del evento: ", id);
  //     return res.status(200).json({ message: "Evento actualizado con éxito" });
  //   } catch (error) {
  //     console.error("Error al agregar imágenes:", error);
  //     throw error;
  //   }
  // }

  // ---------------- Función para eliminar un evento
  if (req.method === "DELETE") {
    const { id } = req.body;

    try {
      const eventoRef = doc(db, "eventos", id);
      await deleteDoc(eventoRef);

      return res.status(200).json({ message: "Evento eliminado." });
    } catch (error) {
      console.error("Error al eliminar evento:", error);
      return res.status(500).json({ error: "Error al eliminar evento." });
    }
  }

  // Si no se recibe una solicitud DELETE, se responde con un error de método no permitido
  return res.status(405).json({ error: "Método no permitido." });
}
