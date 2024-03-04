import { db } from "../../../firebase/client";
import { collection, getDocs } from "firebase/firestore";
import moment from 'moment-timezone';

// La propiedad de "estado" se agrega dinámicamente cuando se realiza la petición, no en la base de datos

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const getEvents = await getDocs(collection(db, "eventos"));
      const eventos = [];
      const currentDate = moment().tz('America/Argentina/Buenos_Aires');

    getEvents.forEach((doc) => {
        const eventoData = doc.data();
        const eventoDate = moment(`${eventoData.fecha} ${eventoData.hora}`, 'DD-MM-YYYY HH:mm').tz('America/Argentina/Buenos_Aires');
        
        // Comparar solo las fechas de currentDate y eventoDate
        const currentDateWithoutTime = currentDate.startOf('day');
        const eventoDateWithoutTime = eventoDate.startOf('day');

        console.log("current day y time ", currentDateWithoutTime, eventoDateWithoutTime)
    
        // Comparar solo las fechas
        if (eventoDateWithoutTime.isBefore(currentDateWithoutTime, 'day')) {
            eventoData.estado = "pasado"; 
        } else if (eventoDateWithoutTime.isAfter(currentDateWithoutTime, 'day')) {
            eventoData.estado = "futuro"; 
        } else {
            eventoData.estado = "próximo"; 
        }
    
        eventos.push({
            id: doc.id,
            ...eventoData
        });
    });

    eventos.sort((a, b) => {
        const fechaA = moment(`${a.fecha} ${a.hora}`, 'DD-MM-YYYY HH:mm').tz('America/Argentina/Buenos_Aires');
        const fechaB = moment(`${b.fecha} ${b.hora}`, 'DD-MM-YYYY HH:mm').tz('America/Argentina/Buenos_Aires');
        return fechaA - fechaB;
      });

      return res.status(200).json(eventos);
    } catch (error) {
      console.error("Error al obtener eventos:", error);
      return res.status(500).json({ message: "Error al obtener eventos." });
    }

  }
}
