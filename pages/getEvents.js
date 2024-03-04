import React, { useState, useEffect } from 'react';

const EventosComponent = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {

    const fetchEventos = async () => {
      try {
        const response = await fetch('/api/eventos/getEvents', { method: "GET" });
        const data = await response.json(); 
        setEventos(data); 
      } catch (error) {
        console.error('Error al obtener los eventos:', error);
      }
    };

    fetchEventos();
    return () => {
    };
  }, []); 

  return (
    <div>
      <h2>Eventos</h2>
      <div>
        {eventos.map(evento => (
          <div key={evento.id}>
            <strong>{evento.title}</strong> {evento.fechaInicio}
            <img src={`data:image/jpeg;base64,${evento.banner}`} alt="Banner del evento" />
            <a href={evento.fotosURL}>link a fotos</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventosComponent;
