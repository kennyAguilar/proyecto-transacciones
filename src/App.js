import { useState } from 'react';
import { Layout } from './components/Layout';
import { TransaccionesFormulario } from './components/TransaccionesFormulario';
import { TablaDatos } from './components/TablaDatos';
import { PagosVista } from './components/PagosVista';
import { ErroresFormulario } from './components/ErroresFormulario';
import { ErroresVista } from './components/ErroresVista';
import { LoginForm } from './components/LoginForm'; // Importar el componente de login
import { sendToGoogleSheets } from './utils/api';
import { transacciones as initialTransacciones } from './mock/transacciones';
import { pagos as initialPagos } from './mock/pagos';
import { errores as initialErrores } from './mock/errores';

export default function App() {
  const [transacciones, setTransacciones] = useState(initialTransacciones);
  const [pagos, setPagos] = useState(initialPagos);
  const [errores, setErrores] = useState(initialErrores);
  const [activeView, setActiveView] = useState('pagosForm'); // Vista inicial: Pagos
  const [loggedIn, setLoggedIn] = useState(false); // Estado para controlar si el usuario ha iniciado sesión
  const [userInfo, setUserInfo] = useState(null); // Estado para guardar la información del usuario

  const handleLogin = (userData) => {
    setUserInfo(userData);
    setLoggedIn(true);
    // Aquí podrías enviar la información del usuario a Google Sheets si es necesario
    // sendToGoogleSheets({ type: 'login', ...userData });
  };

  const handleTransaccionSubmit = async (formData) => {
    try {
      // Añadir numeroRojo a los datos de la transacción
      const dataWithUser = { ...formData, numeroRojo: userInfo.numeroRojo };
      setTransacciones(prev => [...prev, dataWithUser]);
      
      // Enviar a Google Sheets (puedes adaptar sendToGoogleSheets para diferentes tipos de datos)
      await sendToGoogleSheets(dataWithUser);
      
      // Cambiar a vista de tabla
      setActiveView('transaccionesData');
    } catch (error) {
      console.error('Error al procesar la transacción:', error);
    }
  };

  const handleDeleteTransaccion = (indexToDelete) => {
    setTransacciones(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  const handleAddPago = (pagoData) => {
    // Añadir numeroRojo a los datos del pago
    const dataWithUser = { ...pagoData, numeroRojo: userInfo.numeroRojo };
    setPagos(prev => [...prev, dataWithUser]);
    // Aquí podrías agregar la lógica para enviar pagos a Google Sheets si es necesario
  };

  const handleDeletePago = (indexToDelete) => {
    setPagos(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  const handleErrorSubmit = async (formData) => {
    try {
      // Añadir numeroRojo a los datos del error
      const dataWithUser = { ...formData, numeroRojo: userInfo.numeroRojo };
      setErrores(prev => [...prev, dataWithUser]);
      
      // Enviar a Google Sheets (puedes adaptar sendToGoogleSheets para diferentes tipos de datos)
      await sendToGoogleSheets(dataWithUser);
      
      // Cambiar a vista de tabla
      setActiveView('erroresData');
    } catch (error) {
      console.error('Error al procesar el error:', error);
    }
  };

  const handleDeleteError = (indexToDelete) => {
    setErrores(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  if (!loggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <Layout userInfo={userInfo}>
      <div className="space-y-4 sm:space-y-8">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <button
            onClick={() => setActiveView('pagosForm')}
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base ${activeView === 'pagosForm' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Pagos
          </button>
          <button
            onClick={() => setActiveView('transaccionesForm')}
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base ${activeView === 'transaccionesForm' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Transacciones
          </button>
          <button
            onClick={() => setActiveView('erroresForm')}
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base ${activeView === 'erroresForm' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Errores
          </button>
          <button
            onClick={() => setActiveView('transaccionesData')}
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base ${activeView === 'transaccionesData' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Ver Transacciones
          </button>
          <button
            onClick={() => setActiveView('erroresData')}
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base ${activeView === 'erroresData' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Ver Errores
          </button>
        </div>

        {activeView === 'pagosForm' && (
          <PagosVista pagos={pagos} onAddPago={handleAddPago} onDeletePago={handleDeletePago} userInfo={userInfo} />
        )}
        {activeView === 'transaccionesForm' && (
          <TransaccionesFormulario onSubmit={handleTransaccionSubmit} />
        )}
        {activeView === 'erroresForm' && (
          <ErroresFormulario onSubmit={handleErrorSubmit} />
        )}
        {activeView === 'transaccionesData' && (
          <TablaDatos datos={transacciones} onDelete={handleDeleteTransaccion} />
        )}
        {activeView === 'erroresData' && (
          <ErroresVista datos={errores} onDelete={handleDeleteError} />
        )}
      </div>
    </Layout>
  );
}

// DONE