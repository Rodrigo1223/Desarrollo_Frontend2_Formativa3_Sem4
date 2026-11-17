import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router';

function CatalogoLibros() {
  const { genre } = useParams();
  const categoriaActual = genre || 'Ficcion';

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reintentar, setReintentar] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/api/books?genre=${encodeURIComponent(categoriaActual)}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: No se pudo cargar la categoría "${categoriaActual}".`);
        }
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [categoriaActual, reintentar]);

  if (loading) {
    return <div style={{ padding: '3rem', textAlign: 'center', fontSize: '1.1rem' }}>⏳ Cargando libros de {categoriaActual}...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: '#b91c1c' }}>
        <h3>⚠️ Ocurrió un problema</h3>
        <p style={{ margin: '0.5rem 0' }}>{error}</p>
        <button onClick={() => setReintentar(prev => prev + 1)} style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
          Reintentar consulta
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Categoría: {categoriaActual}</h2>
      {books.length === 0 ? (
        <p style={{ marginTop: '1rem', color: '#666' }}>No hay libros disponibles en esta categoría actualmente.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '1rem' }}>
          {books.map((b, idx) => (
            <div key={idx} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', background: '#fff' }}>
              <h4>{b.title}</h4>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Autor: {b.author}</p>
              <p style={{ color: 'green', fontWeight: 'bold', marginTop: '0.5rem' }}>{b.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <header style={{ background: '#1e1b4b', color: '#fff', padding: '1rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.2rem' }}>📚 Librería Duoc</h1>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/categoria/Ficcion" style={{ color: '#c7d2fe', textDecoration: 'none' }}>Ficción</Link>
            <Link to="/categoria/CienciaFiccion" style={{ color: '#c7d2fe', textDecoration: 'none' }}>Ciencia Ficción</Link>
            <Link to="/categoria/Drama" style={{ color: '#c7d2fe', textDecoration: 'none' }}>Drama (Vacía)</Link>
            <Link to="/categoria/Inexistente" style={{ color: '#fca5a5', textDecoration: 'none' }}>Error 404</Link>
          </nav>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<CatalogoLibros />} />
        <Route path="/categoria/:genre" element={<CatalogoLibros />} />
      </Routes>
    </BrowserRouter>
  );
}