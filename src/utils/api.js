// Función para guardar datos localmente (sin Google Sheets)
export const sendToGoogleSheets = async (data) => {
  try {
    // Si no hay URL de Google Sheets configurada, guardar localmente
    const googleSheetsUrl = process.env.REACT_APP_GOOGLE_SHEETS_URL;
    
    if (!googleSheetsUrl || googleSheetsUrl === 'TU_URL_DE_GOOGLE_APPS_SCRIPT') {
      // Guardar en localStorage como backup
      const existingData = JSON.parse(localStorage.getItem('app_data') || '[]');
      const newData = {
        ...data,
        timestamp: new Date().toISOString(),
        id: Date.now() // ID único simple
      };
      
      existingData.push(newData);
      localStorage.setItem('app_data', JSON.stringify(existingData));
      
      console.log('✅ Datos guardados localmente:', newData);
      return { success: true, message: 'Datos guardados localmente', data: newData };
    }

    // Si hay URL configurada, intentar enviar a Google Sheets
    const response = await fetch(googleSheetsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al enviar datos a Google Sheets');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    
    // En caso de error, guardar localmente como fallback
    const existingData = JSON.parse(localStorage.getItem('app_data') || '[]');
    const newData = {
      ...data,
      timestamp: new Date().toISOString(),
      id: Date.now(),
      status: 'pending_sync' // Marcar para sincronizar después
    };
    
    existingData.push(newData);
    localStorage.setItem('app_data', JSON.stringify(existingData));
    
    console.log('⚠️ Error en envío, guardado localmente:', newData);
    return { success: true, message: 'Guardado localmente por error de conexión', data: newData };
  }
};

// Función para exportar datos locales (opcional)
export const exportLocalData = () => {
  const data = JSON.parse(localStorage.getItem('app_data') || '[]');
  
  if (data.length === 0) {
    alert('No hay datos locales para exportar');
    return;
  }

  // Crear archivo CSV
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => row[header] || '').join(','))
  ].join('\n');

  // Descargar archivo
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `datos_backup_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
  
  console.log('📁 Datos exportados exitosamente');
};