import moment from "moment-timezone";
import { db } from "../../../firebase/client";
import { collection, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const eventsRef = collection(db, "eventos");
      const getEvents = await getDocs(eventsRef);

      const events = [];

      getEvents.forEach((doc) => {
        events.push({
          id: doc.id,
          ...doc.data()
        });
      });

      events.sort((a,b) => {
        const dateA = moment(a.fechaInicio, 'DD/MM/YYYY')
        const dateB = moment(b.fechaInicio, 'DD/MM/YYYY')
        return dateA - dateB
      })

      return res.status(200).json(events);

    } catch (error) {
      console.error("Error al obtener eventos:", error);
      return res.status(500).json({ message: "Error al obtener eventos." });
    }
  }
}
