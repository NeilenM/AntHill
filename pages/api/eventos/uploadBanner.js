import { db, storage } from "../../../firebase/client";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import fs from 'fs';
import { IncomingForm } from 'formidable';
import { join } from 'path';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    console.log("FORM", form)

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error al analizar el formulario:', err);
        return res.status(500).json({ success: false, message: 'Error al analizar el formulario.' });
      }

      try {
        const file = files.file;

        if (!file) {
          return res.status(400).json({ success: false, message: 'No se ha enviado ningún archivo.' });
        }

        const filePath = join(process.cwd(), 'public', 'images', file.name);

        fs.renameSync(file.path, filePath);

        // Realiza otras operaciones necesarias, como subir el archivo a Firebase Storage

        return res.status(200).json({ success: true, message: 'Archivo subido correctamente.' });
      } catch (error) {
        console.error('Error al subir la imagen y actualizar el documento:', error);
        return res.status(500).json({ success: false, message: 'Error al subir la imagen y actualizar el documento.' });
      }
    });
  } else {
    return res.status(405).json({ success: false, message: 'Método no permitido.' });
  }
}
