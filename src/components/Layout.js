export const Layout = ({ children, userInfo }) => {
  return (
    <div className="min-h-screen bg-gray-900 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-4 sm:mb-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-100">Block de Notas y Pagos</h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-400">Sistema de gestión de transacciones y pagos</p>
          </div>
          {userInfo && (
            <div className="text-center sm:text-right text-gray-300">
              <p className="text-base sm:text-lg font-semibold">{userInfo.nombre}</p>
              <p className="text-xs sm:text-sm">Rojo: {userInfo.numeroRojo}</p>
            </div>
          )}
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};