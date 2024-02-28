import { db, storage } from "../../../firebase/client";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import multer from "multer";

// Agregando multer como middleware para guardar fotos
const upload = multer().single('banner');


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const id = "LxRBLoqQER0N0nqMwC00";
        const dateTime = Date.now();
        try {
            upload(req, res, async function(err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).json({ error: err.message });
                } else if (err) {
                    return res.status(500).json({ error: err.message });
                }

                console.log("REFILEEEE --------------", req.file);
                const storageRef = ref(storage, `files/${req.file.originalname + " " + dateTime}`);

                const metadata = {
                    contentType: req.file.mimetype,
                };
                
                const snapShot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
                const downloadURL = await getDownloadURL(snapShot.ref);

                console.log("Imagen subida");

                // Actualizar el documento existente en Firestore con la URL de descarga de la imagen
                const eventRef = doc(db, 'eventos', id); 
                await updateDoc(eventRef, {
                    banner: downloadURL
                });

                // Devolver una respuesta al cliente
                return res.status(200).json({ 
                    message: 'Imagen subida y documento actualizado correctamente',
                    downloadURL: downloadURL
                });
            });
        } catch (error) {
            console.error('Error al subir la imagen a Firebase y actualizar el documento:', error);
            return res.status(500).json({ error: 'Error al subir la imagen a Firebase y actualizar el documento' });
        }
    } else {
        return res.status(405).end();
    }
}