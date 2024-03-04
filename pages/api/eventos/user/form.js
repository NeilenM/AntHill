import { db } from "../../../../firebase/client";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export default async function handler(req, res) {

  if (req.method === "POST") {

        const { nombre, email, telefono } = req.body;
    
        try {
                const contactsQuery = query(collection(db, "contactos"), where("email", "==", email));
                const contactsSnapshot = await getDocs(contactsQuery);
          
                if (!contactsSnapshot.empty) {
                  return res.status(400).json({ error: "El correo electrónico ya está registrado" });
                }
          
                const docData = {};

            if (nombre) {
            docData.nombre = nombre;
            }
            if (email) {
            docData.email = email;
            }
            if (telefono) {
            docData.telefono = telefono;
            } 

               const docRef = await addDoc(collection(db, "contactos"), docData);
          

      return res.status(201).json({ message: "contacto agregado" });
    } catch (e) {
      console.error("Error al agregar contacto:", e);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  if (req.method === "GET") {
    try {
      const querySnapshot = await getDocs(collection(db, "contactos"));
      const contacts = [];

      querySnapshot.forEach((doc) => {
        contacts.push({
          id: doc.id,
          data: doc.data()
        });
      });

      return res.status(200).json(contacts);
    } catch (e) {
      console.error("Error al obtener contactos:", e);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  return res.status(405).json({ error: "Método HTTP no permitido" });
}
