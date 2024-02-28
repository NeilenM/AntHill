import bcrypt from "bcryptjs";
import { db } from "../../../../firebase/client"
import { collection, getDocs, query, where } from "firebase/firestore";

export default async function handler(req, res) {

  // --------------  Lógica para el inicio de sesión --------------

  if (req.method === "POST") {
    const { email, password } = req.body;
    console.log("const ", email)
    console.log("password", password)

    if (!email || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios." });
    }

    try {
      // Buscar el usuario por su correo electrónico en la base de datos
      const user = query(collection(db, "Usuarios"), where("email", "==", email));
      const getUser = await getDocs(user);

      const userDocs = getUser.docs;

      if (userDocs.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado." });
      }

      const userData = userDocs[0].data();
      const hashedPassword = userData.password;

      // Comparar la contraseña hasheada almacenada con la contraseña proporcionada
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {

        return res.status(200).json({ message: "Inicio de sesión exitoso." });
      } else {
        return res.status(401).json({ message: "Contraseña incorrecta." });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  }
}
