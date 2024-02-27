// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "../../../firebase/client";
import { collection, addDoc, doc, updateDoc, getDocs } from "firebase/firestore";

export default async function handler(req, res) {

  if  (req.method === "PUT") {
    const { id, ...updatingData} = req.body;

    try {
      const eventoRef = doc(db, "eventos", id);
      await updateDoc(eventoRef, updatingData);

      console.log("Id del evento: ", id);
      return res.status(200).json({ message: "Evento actualizado con éxito" });
    } catch (error) {
      console.error("Error al agregar imágenes:", error);
      throw error;
    }
  }
}