import { useMemo } from 'react';
import { exportLocalData } from '../utils/api'; // Importar función de exportación
// No se importa XLSX aquí, ya que no está permitido.
// En un entorno real, se importaría: import * as XLSX from 'xlsx';

export const TablaDatos = ({ datos, onDelete }) => {
  const handleDownload = () => {
    // Crear CSV con los datos actuales de la tabla
    if (datos.length === 0) {
      alert('No hay datos para descargar');
      return;
    }

    const headers = ['Fecha', 'Hora', 'Rojo', 'MDA', 'Isla', 'Tipo', 'Monto', 'Hex Suma', 'Observación'];
    const csvContent = [
      headers.join(','),
      ...datos.map(item => [
        item.fecha || '',
        item.hora || '',
        item.numeroRojo || '',
        item.mda || '',
        item.isla || '',
        item.tipo || '',
        item.monto || '',
        item.hexadecimalSum || '',
        `"${(item.observacion || '').replace(/"/g, '""')}"` // Escapar comillas en observaciones
      ].join(','))
    ].join('\n');

    // Descargar archivo CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transacciones_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    console.log("✅ Datos descargados como CSV:", datos);
  };

  const handleExportAll = () => {
    // Exportar todos los datos guardados localmente
    exportLocalData();
  };

  const formatMonto = (monto) => {
    if (!monto) return '';
    return `$${monto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  const hasData = useMemo(() => datos.length > 0, [datos]);

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6 bg-gray-800 rounded-xl shadow-md space-y-4 overflow-x-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-100 mb-2 sm:mb-0">Registros</h2>
        {hasData && (
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm sm:text-base"
            >
              Descargar CSV
            </button>
            <button
              onClick={handleExportAll}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Exportar Todo
            </button>
          </div>
        )}
      </div>

      {hasData ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:px-6 sm:py-3">Fecha</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:px-6 sm:py-3">Hora</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:px-6 sm:py-3">Rojo</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:px-6 sm:py-3">MDA</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:px-6 sm:py-3">Isla</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:px-6 sm:py-3">Tipo</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:px-6 sm:py-3">Monto</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:px-6 sm:py-3">Hex Suma</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:px-6 sm:py-3">Observación</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:px-6 sm:py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {datos.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300 sm:px-6 sm:py-4">{item.fecha}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300 sm:px-6 sm:py-4">{item.hora}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300 sm:px-6 sm:py-4">{item.numeroRojo}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300 sm:px-6 sm:py-4">{item.mda}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300 sm:px-6 sm:py-4">{item.isla}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300 sm:px-6 sm:py-4">{item.tipo}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300 sm:px-6 sm:py-4">{formatMonto(item.monto)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300 sm:px-6 sm:py-4">{item.hexadecimalSum}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300 sm:px-6 sm:py-4">{item.observacion}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium sm:px-6 sm:py-4">
                    <button
                      onClick={() => onDelete(index)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-400 py-4 text-sm sm:text-base">No hay datos registrados aún</p>
      )}
    </div>
  );
};