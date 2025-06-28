import { useState } from 'react';

export const FormularioElegante = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fecha: '',
    nombre: '',
    mda: '300', // Valor fijo para MDA
    mdaSuffix: '', // Para los últimos 3 dígitos de MDA
    isla: '', // Ahora es un campo de texto
    tipo: '',
    monto: '',
    observacion: '',
    hexadecimal: ''
  });

  const tiposTransaccion = [
    "Transaccion Fallida",
    "Cancel Credit",
    "Ship Cash",
    "Jackpot",
    "Pago Manual",
    "Pago Compensatorio"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMontoChange = (e) => {
    let value = e.target.value.replace(/\./g, ''); // Eliminar puntos existentes
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Agregar puntos cada 3 dígitos
    setFormData(prev => ({ ...prev, monto: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullMda = formData.mda + formData.mdaSuffix;
    let hexSum = 0;
    if (formData.hexadecimal) {
      try {
        hexSum = parseInt(formData.hexadecimal, 16);
      } catch (error) {
        console.error("Error al convertir hexadecimal:", error);
        alert("El valor hexadecimal no es válido.");
        return;
      }
    }

    onSubmit({
      ...formData,
      mda: fullMda,
      monto: formData.monto.replace(/\./g, ''), // Guardar monto sin puntos para el backend
      hexadecimalSum: hexSum // Agregamos la suma del hexadecimal
    });

    setFormData({
      fecha: '',
      nombre: '',
      mda: '300',
      mdaSuffix: '',
      isla: '',
      tipo: '',
      monto: '',
      observacion: '',
      hexadecimal: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-gray-800 rounded-xl shadow-md space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Fecha</label>
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">MDA</label>
        <div className="flex">
          <input
            type="text"
            value={formData.mda}
            readOnly
            className="w-1/3 px-3 py-2 border border-gray-600 rounded-l-md shadow-sm bg-gray-700 text-white cursor-not-allowed"
          />
          <input
            type="text"
            name="mdaSuffix"
            value={formData.mdaSuffix}
            onChange={handleChange}
            maxLength="3"
            className="w-2/3 px-3 py-2 border border-gray-600 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            placeholder="Ej: 001"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Isla</label>
        <input
          type="text"
          name="isla"
          value={formData.isla}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          placeholder="Ej: Gran Canaria"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Tipo de transacción</label>
        <select
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          required
        >
          <option value="">Seleccione un tipo</option>
          {tiposTransaccion.map((tipo, index) => (
            <option key={index} value={tipo}>{tipo}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Monto (CLP)</label>
        <input
          type="text"
          name="monto"
          value={formData.monto}
          onChange={handleMontoChange}
          className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          placeholder="Ej: $1.000"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Observación</label>
        <textarea
          name="observacion"
          value={formData.observacion}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white resize-none"
          placeholder="Cualquier nota adicional"
        ></textarea>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Hexadecimal</label>
        <input
          type="text"
          name="hexadecimal"
          value={formData.hexadecimal}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          placeholder="Ej: FF (se sumará a decimal)"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        Enviar datos
      </button>
    </form>
  );
};