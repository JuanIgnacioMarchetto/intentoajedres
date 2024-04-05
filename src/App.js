import React, { useState } from 'react';
import ChessGame from './ChessGame';
import "./App.css"
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
  };

  return (
    <div>
      {loggedIn ? (
        <ChessGame username={username} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

// Definimos el componente para el inicio de sesión
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí puedes realizar la validación de usuario y contraseña
    // Simplemente estamos almacenando el usuario en localStorage como ejemplo
    localStorage.setItem('username', username);
    onLogin(username);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
}

export default App;
