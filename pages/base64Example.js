import React, { useState } from "react";

export default function UploadBanner() {
  const [file, setFile] = useState();

  const covertBase64 = (archivos) => {
    Array.from(archivos).forEach(archivo => {
        var reader = new FileReader(); 
        reader.readAsDataURL(archivo);
        reader.onload = function() {
            let arrayAuxiliar = []
            const base64 = reader.result;
            arrayAuxiliar =  base64.split(',')[1]
            setFile(arrayAuxiliar)
        }
    })
  }

  console.log( file)

  const renderImage = () => {
    if (file) {
      return <img src={`data:image/jpeg;base64,${file}`} alt="Uploaded" />;
    } else {
      return null;
    }
  }


  return (
    <div>
    <input type="file" multiple onChange={(e) => covertBase64(e.target.files)} />
    {renderImage()}
  </div>
  );
}
