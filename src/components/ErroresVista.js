import { useMemo } from 'react';

export const ErroresVista = ({ datos, onDelete }) => {
  const handleDownload = () => {
    // Simulación de descarga de Excel.
    // En un entorno real, se usaría la librería 'xlsx' para generar el archivo.
    // Ejemplo de cómo se haría con 'xlsx':
    /*
    const ws = XLSX.utils.json_to_sheet(datos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Errores");
    XLSX.writeFile(wb, "errores.xlsx");
    */
    alert('La funcionalidad de descarga de Excel está simulada. En un entorno real, se generaría un archivo .xlsx compatible.');
    console.log("Datos a descargar:", datos);
  };

  const hasData = useMemo(() => datos.length > 0, [datos]);

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6 bg-gray-800 rounded-xl shadow-md space-y-4 overflow-x-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-100 mb-2 sm:mb-0">Registros de Errores</h2>
        {hasData && (
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm sm:text-base"
          >
            Descargar Excel
          </button>
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
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:px-6 sm:py-3">Tipo de Error</th>
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
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300 sm:px-6 sm:py-4">{item.tipoError}</td>
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