// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "../../../firebase/client";
import { collection, addDoc, doc, updateDoc, getDocs } from "firebase/firestore";

export default async function handler(req, res) {

  // --------------  Lógica para agregar un evento --------------

  if (req.method === "POST") {
    const { fecha, hora, artistas, fotos } = req.body;

    if (!fecha || !hora || !artistas) {
      return res.status(400).json({ message: "Faltan campos obligatorios." });
    }

    try {
      const docRef = await addDoc(collection(db, "eventos"), {
        fecha,
        hora,
        artistas,
        fotos: null
      });
      console.log("Evento creado con ID: ", docRef.id);
      return res.status(201).json({ message: "Evento creado exitosamente." });
    } catch (error) {
      console.error("Error al crear evento:", error);
      throw error;
    }
  }
  
  // -------------- Lógica para obtener todos los eventos --------------
  
  if (req.method === "GET") {
    try {
      const eventosSnapshot = await getDocs(collection(db, "eventos"));
      const eventos = [];
      
      eventosSnapshot.forEach((doc) => {
        eventos.push({
          id: doc.id,
          ...doc.data() // Obtenemos los datos del documento de la db
        });
      });

      return res.status(200).json(eventos);
    } catch (error) {
      console.error("Error al obtener eventos:", error);
      throw error;
    }

  }
  
  // -------------- Lógica para agregar fotos a un evento --------------
  
  if  (req.method === "PUT") {
    const { id, fotos } = req.body;

    try {
      const eventoRef = doc(db, "eventos", id);
      await updateDoc(eventoRef, {
        fotos 
      });

      console.log("Id del evento: ", id);
      return res.status(200).json({ message: "Evento actualizado con éxito" });
    } catch (error) {
      console.error("Error al agregar imágenes:", error);
      throw error;
    }
  }
}
