export const sendToGoogleSheets = async (data) => {
  try {
    // Reemplaza esta URL con tu Web App de Google Apps Script
    const response = await fetch('TU_URL_DE_GOOGLE_APPS_SCRIPT', {
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
    throw error;
  }
};