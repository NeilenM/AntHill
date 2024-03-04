import moment from 'moment-timezone';
import { db } from '../../../firebase/client';
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const eventsRef = collection(db, 'eventos');
            const querySnapshot = await getDocs(eventsRef);
            const currentDate = moment().tz('America/Argentina/Buenos_Aires');

            const futureEvents = [];

            querySnapshot.forEach((doc) => {
                const eventData = doc.data();
                const currentDateWithoutTime = currentDate.startOf('day');

                if (!eventData.fechaFin) {
                    const startDate = moment(`${eventData.fechaInicio} `, 'DD-MM-YYYY');
                    if (startDate.isSameOrAfter(currentDateWithoutTime)) {
                        futureEvents.push(eventData);
                    }
                } else {
                    const endDate = moment(`${eventData.fechaFin} `, 'DD-MM-YYYY ');
                    if (endDate.isSameOrAfter(currentDateWithoutTime)) {
                        futureEvents.push(eventData);
                    }
                }
            });

            futureEvents.sort((a,b) => {
                const dateA = moment(a.fechaInicio, 'DD/MM/YYYY')
                const dateB = moment(b.fechaInicio, 'DD/MM/YYYY')

                return dateA - dateB
            })

            res.status(200).json({ futureEvents });
        } catch (error) {
            console.error("Error al obtener eventos futuros:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    } else {
        res.status(405).json({ error: "Método no permitido" });
    }
}
