import React, { useState, useEffect } from 'react';

function App() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    const nuevoUsuario = { nombre, email };
    await fetch('http://localhost:3001/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario),
    });
    setNombre('');
    setEmail('');
    obtenerUsuarios();
  };

  const obtenerUsuarios = async () => {
    const res = await fetch('http://localhost:3001/api/usuarios');
    const data = await res.json();
    setUsuarios(data);
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <div>
      <h1>Crear Usuario</h1>
      <form onSubmit={manejarEnvio}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Guardar</button>
      </form>

      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map((u, i) => (
          <li key={i}>{u.nombre} - {u.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
