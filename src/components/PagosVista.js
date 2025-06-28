import { useState, useMemo } from 'react';

export const PagosVista = ({ pagos, onAddPago, onDeletePago, userInfo }) => { // Agregamos userInfo
  const [newPago, setNewPago] = useState({
    isla: '',
    mda: '300',
    mdaSuffix: '',
    monto: ''
  });

  const handleMontoChange = (e) => {
    let value = e.target.value.replace(/\./g, '');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    setNewPago(prev => ({ ...prev, monto: value }));
  };

  const handleAddPago = () => {
    if (newPago.isla && newPago.mdaSuffix && newPago.monto) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentSecond = now.getSeconds();

      let fechaJornada = new Date(now); // Copia la fecha actual

      // Si la hora es entre 00:00 AM y 06:00 AM, la jornada pertenece al día anterior
      if (currentHour >= 0 && currentHour < 6) {
        fechaJornada.setDate(fechaJornada.getDate() - 1);
      }

      onAddPago({
        isla: newPago.isla,
        mda: newPago.mda + newPago.mdaSuffix,
        monto: newPago.monto.replace(/\./g, ''),
        fecha: fechaJornada.toISOString().split('T')[0], // Fecha de la jornada
        hora: `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}:${currentSecond.toString().padStart(2, '0')}`, // Hora actual
        numeroRojo: userInfo.numeroRojo // Agregamos el numeroRojo del usuario logueado
      });
      setNewPago({
        isla: '',
        mda: '300',
        mdaSuffix: '',
        monto: ''
      });
    } else {
      alert('Por favor, complete todos los campos para agregar un pago.');
    }
  };

  const formatMonto = (monto) => {
    if (!monto) return '';
    return `$${monto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  const hasPagos = useMemo(() => pagos.length > 0, [pagos]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-800 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-100">Gestión de Pagos</h2>

      <div className="space-y-4 p-4 border border-gray-700 rounded-md">
        <h3 className="text-lg font-medium text-gray-200">Agregar Nuevo Pago</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Isla (Ej: 01)"
            value={newPago.isla}
            onChange={(e) => setNewPago(prev => ({ ...prev, isla: e.target.value }))}
            className="px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white text-sm sm:text-base"
          />
          <div className="flex">
            <input
              type="text"
              value={newPago.mda}
              readOnly
              className="w-1/3 px-3 py-2 border border-gray-600 rounded-l-md shadow-sm bg-gray-700 text-white cursor-not-allowed text-sm sm:text-base"
            />
            <input
              type="text"
              placeholder="MDA Suffix"
              value={newPago.mdaSuffix}
              onChange={(e) => setNewPago(prev => ({ ...prev, mdaSuffix: e.target.value }))}
              maxLength="3"
              className="w-2/3 px-3 py-2 border border-gray-600 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white text-sm sm:text-base"
            />
          </div>
          <input
            type="text"
            placeholder="Monto (CLP)"
            value={newPago.monto}
            onChange={handleMontoChange}
            className="px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white text-sm sm:text-base"
          />
        </div>
        <button
          onClick={handleAddPago}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          Agregar Pago
        </button>
      </div>

      {hasPagos ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:px-6 sm:py-3">Fecha</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:px-6 sm:py-3">Hora</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:px-6 sm:py-3">Rojo</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:px-6 sm:py-3">Isla</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:px-6 sm:py-3">MDA</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:px-6 sm:py-3">Monto</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:px-6 sm:py-3"></th> {/* Columna para el icono */}
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {pagos.map((pago, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300 sm:px-6 sm:py-4">{pago.fecha}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300 sm:px-6 sm:py-4">{pago.hora}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300 sm:px-6 sm:py-4">{pago.numeroRojo}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300 sm:px-6 sm:py-4">{pago.isla}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300 sm:px-6 sm:py-4">{pago.mda}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300 sm:px-6 sm:py-4">{formatMonto(pago.monto)}</td>
                  <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium sm:px-6 sm:py-4">
                    <button
                      onClick={() => onDeletePago(index)}
                      className="text-red-600 hover:text-red-900 transition-colors p-1 rounded-full"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm-1 3a1 1 0 100 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-400 py-4 text-sm sm:text-base">No hay pagos registrados aún</p>
      )}
    </div>
  );
};