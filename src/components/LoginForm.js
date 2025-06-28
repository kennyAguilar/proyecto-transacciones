import { useState } from 'react';

export const LoginForm = ({ onLogin }) => {
  const [nombre, setNombre] = useState('');
  const [numeroRojo, setNumeroRojo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre && numeroRojo) {
      onLogin({ nombre, numeroRojo });
    } else {
      alert('Por favor, ingresa tu nombre y número de rojo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <form onSubmit={handleSubmit} className="max-w-md w-full p-6 sm:p-8 bg-gray-800 rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-gray-100 text-center text-lg sm:text-2xl">Iniciar Sesión</h2>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white text-sm sm:text-base"
            placeholder="Tu nombre"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Número de Rojo</label>
          <input
            type="text"
            value={numeroRojo}
            onChange={(e) => setNumeroRojo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white text-sm sm:text-base"
            placeholder="Tu número de rojo"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors sm:text-base"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};