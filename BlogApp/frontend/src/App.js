import React, { useEffect, useState } from "react";
import API from "./services/api";

function App() {
  const [posts, setPosts] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [autor, setAutor] = useState("");

  const load = async () => {
    try {
      const res = await API.get("/");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
      alert("No se pudo obtener posts. ¿El backend está corriendo?");
    }
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/", { titulo, contenido, autor });
      setTitulo(""); setContenido(""); setAutor("");
      await load();
    } catch (err) {
      console.error(err);
      alert("Error al crear post");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h1>BlogApp</h1>
      <form onSubmit={submit} style={{ marginBottom: 20 }}>
        <div>
          <input placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} required style={{width:"100%", padding:8, marginBottom:8}} />
        </div>
        <div>
          <textarea placeholder="Contenido" value={contenido} onChange={e => setContenido(e.target.value)} required style={{width:"100%", padding:8, marginBottom:8}} />
        </div>
        <div>
          <input placeholder="Autor" value={autor} onChange={e => setAutor(e.target.value)} required style={{width:"100%", padding:8, marginBottom:8}} />
        </div>
        <button type="submit" style={{padding:"8px 16px"}}>Crear publicación</button>
      </form>

      <hr />
      <h2>Publicaciones</h2>
      {posts.length === 0 && <p>No hay publicaciones.</p>}
      <ul>
        {posts.map(p => (
          <li key={p.id} style={{marginBottom:12}}>
            <strong>{p.titulo}</strong> <em>por {p.autor} - {new Date(p.fecha).toLocaleString()}</em>
            <p>{p.contenido}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;