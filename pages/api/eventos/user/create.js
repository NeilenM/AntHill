import bcrypt from "bcryptjs";
import { db } from "../../../../firebase/client";
import { collection, addDoc  } from "firebase/firestore";

export default async function handler(req, res) {

  if (req.method === "POST") {
    const { email, password } = req.body;

    console.log("email", email, password)

    if (!email || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const docRef = await addDoc(collection(db, "Usuarios"), {
        email,
        password: hashedPassword, 
      });
      console.log("usuario creado con ID: ", docRef.id);
      return res.status(201).json({ message: "Usuario creado con éxito" });
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw error;
    }
  }
}
