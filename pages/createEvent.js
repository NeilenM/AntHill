import { useState } from 'react';

const CreateEventComponent = () => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [hora, setHora] = useState('');
  const [locacion, setLocacion] = useState('');
  const [artistas, setArtistas] = useState([]);
  const [banner, setBanner] = useState();
  const [currentArtist, setCurrentArtist] = useState('');

  const handleAddArtist = () => {
    if (currentArtist.trim() !== '') {
      const artistList = currentArtist.split(',').map(artist => artist.trim());
      setArtistas(prevArtistas => [...prevArtistas, ...artistList]);
      setCurrentArtist('');
    }
  };

  const covertBase64 = (archivos) => {
    Array.from(archivos).forEach(archivo => {
      var reader = new FileReader(); 
      reader.readAsDataURL(archivo);
      reader.onload = function() {
        let arrayAuxiliar = [];
        const base64 = reader.result;
        arrayAuxiliar =  base64.split(',')[1];
        setBanner(arrayAuxiliar);
      };
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = {
      fechaInicio,
      fechaFin,
      hora,
      locacion,
      artistas,
      banner
    };
    const eventDataJSON = JSON.stringify(eventData);
    const res = await fetch('/api/eventos/create', {
      method: 'POST',
      body: eventDataJSON,
      headers: {
        "Content-Type": 'application/json',
      },
    });
    const response = await res.json();
  };

  return (
    <div>
      <h2>Crear Evento</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Fecha de Inicio:</label>
          <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
        </div>
        <div>
          <label>Fecha de Fin:</label>
          <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
        </div>
        <div>
          <label>Horario:</label>
          <input type="text" value={hora} onChange={(e) => setHora(e.target.value)} />
        </div>
        <div>
          <label>Lugar:</label>
          <input type="text" value={locacion} onChange={(e) => setLocacion(e.target.value)} />
        </div>
        <div>
          <label>Artistas:</label>
          <input type="text" value={currentArtist} onChange={(e) => setCurrentArtist(e.target.value)} />
          <button type="button" onClick={handleAddArtist}>Agregar Artista</button>
          <ul>
            {artistas.map((artist, index) => (
              <li key={index}>{artist}</li>
            ))}
          </ul>
        </div>
        <div>
          <label>Imagen del Banner:</label>
          <input type="file" multiple onChange={(e) => covertBase64(e.target.files)} />
        </div>
        <button type="submit">Crear Evento</button>
      </form>
    </div>
  );
};

export default CreateEventComponent;








// import { useState } from "react";

// export default function Upload() {
//   const [file, setBanner] = useState();
//   const id = "3hZP2ky0xEF7UyDVhnKi"; // ID del evento

//   const onSubmit = async (e) => {
//     e.preventDefault()
//     if (!file) return

//     try {
//       const formData = new FormData();
//       formData.set('file', file);
      
//       console.log(' file--------', formData.get('file'))

//       const res = await fetch('/api/eventos/uploadBanner', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           "Content-Type": 'multipart/form-data',
//           // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       })
//       const response = await res.json()
//       // handle the error
//       if (response.ok) {
//         console.log("EVIANADO")
//       }
//       console.log("nooooooooooo", response)
//     } catch (e) {
//       // Handle errors here
//       console.error(e)
//     }
//   }

//   return (
//     <form onSubmit={onSubmit}>
//     <input
//       type="file"
//       name="file"
//       onChange={(e) => setBanner(e.target.files?.[0])}
//     />
//     <input type="submit" value="Upload" />
//   </form>
//   );
// }
