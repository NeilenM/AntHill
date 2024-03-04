import moment from 'moment-timezone';
import { db } from '../../../firebase/client'
import { collection, getDocs } from 'firebase/firestore'


export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const querySnapshot = await getDocs(collection(db, "eventos"));
            const currentDate = moment()
            const pastEvents = [];

            querySnapshot.forEach((doc) => {
                const eventData = doc.data();
                const currentDateWithoutTime = currentDate.startOf('day');

                if (!eventData.fechaFin) {
                    const startDate = moment(`${eventData.fechaInicio} `, 'DD/MM/YYYY')
                    if (startDate.isBefore(currentDateWithoutTime)) {
                        pastEvents.push(eventData);
                    }
                } else {
                    const endDate = moment(`${eventData.fechaFin} `, 'DD/MM/YYYY ')
                    if (endDate.isBefore(currentDateWithoutTime)) {
                        pastEvents.push(eventData);
                    }
                }
            });

            //Devolverlos ordenados por fecha
            // En el caso de los eventos pasados, devolver desde el más reciente hasta el más antiguo
            pastEvents.sort((a,b) => {
                const dateA = moment(a.fechaInicio,'DD/MM/YYYY')
                const dateB = moment(b.fechaInicio,'DD/MM/YYYY')

                return dateB - dateA
            })

            res.status(200).json({ pastEvents });

        } catch (error) {
            console.error("Error al obtener eventos pasados:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    } else {
        res.status(405).json({ error: "Método no permitido" });
    }
}
