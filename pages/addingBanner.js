import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState();
  const id = "LxRBLoqQER0N0nqMwC00"; // ID del evento

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!file) return

    try {
      const data = new FormData()
      data.set('file', file)

      const res = await fetch('/api/eventos/uploadBanner', {
        method: 'POST',
        body: data
      })
      // handle the error
      if (res.ok) {
        console.log("EVIANADO")
      }
      console.log("nooooooooooo")
    } catch (e) {
      // Handle errors here
      console.error(e)
    }
  }

  return (
    <form onSubmit={onSubmit}>
    <input
      type="file"
      name="file"
      onChange={(e) => setFile(e.target.files?.[0])}
    />
    <input type="submit" value="Upload" />
  </form>
  );
}
