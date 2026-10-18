import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Conecta los estilos de tu paleta de colores

// Buscamos el contenedor 'root' de tu index.html e inyectamos React allí
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
