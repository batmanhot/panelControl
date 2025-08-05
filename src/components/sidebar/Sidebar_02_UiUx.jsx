import React, { useState, useCallback } from 'react'
import { FaTimes, FaBars } from 'react-icons/fa'

import MenuOpciones from './Sidebar_03_opciones';
import Sidebar_05_Header from './Sidebar_05_Header.jsx';

export default function Sidebar_02_UiUx() {

  // Estado para controlar si el sidebar está en modo oscuro/claro
  const [Theme, setTheme] = useState('light');    

  // Estado para controlar si el sidebar está abierto/colapsado (en escritorio) o visible (en móvil)
  const [isCollapsed, setIsCollapsed] = useState(false);    // true = colapsado, false = expandido
  const [isMobileOpen, setIsMobileOpen] = useState(false);  // true = sidebar visible en móvil

  // Función para alternar el tema entre claro y oscuro 
    const toggleTheme = useCallback(() => {
     setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, [setTheme]);
  

  // Estado para controlar la apertura/cierre de sub-menús
  //const [openSubmenu, setOpenSubmenu] = useState(null);

  //const toggleSubmenu = (itemName) => {
  //    setOpenSubmenu(openSubmenu === itemName ? null : itemName);
  //};
  
  // Manejador de clic para los enlaces de navegación
  // const handleNavLinkClick = (link) => {
  //   if (onNavigate) {
  //     onNavigate(link);       // Llama a la función pasada por prop para actualizar la URL del iframe
  //     setIsMobileOpen(false); // Cierra el sidebar en móviles después de la navegación
  //   }
  // };
      
  return (
    <>
          {/* Botón de menú para dispositivos móviles (visible solo en pantallas pequeñas) */}
          <div className="md:hidden fixed top-2 left-4 z-50">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 text-gray-700 bg-white rounded-md items-center shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label={isMobileOpen ? "Cerrar menú" : "Abrir menú"}
            >              
              { isMobileOpen ? <FaTimes size={18} /> :  <FaBars size={18} />}               
              
            </button>
          </div>
    
          {/* Overlay oscuro para dispositivos móviles cuando el sidebar está abierto */}
          {isMobileOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
              onClick={() => setIsMobileOpen(false)}
              aria-hidden="true"
            ></div>
          )}

      <Sidebar_05_Header Theme={Theme} isCollapsed={isCollapsed} isMobileOpen={isMobileOpen}/> 
      <div className={`
            fixed left-0 h-full inset-y-0 shadow-gray-900/100 
            p-3 space-y-6
            transform transition-all duration-300 ease-in-out           
            ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full w-75'}
            md:translate-x-0 md:relative md:flex-shrink-0 md:shadow-lg
            ${isCollapsed ? 'md:w-20' : 'md:w-75 md:shadow-xl'}
            ${Theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900 border-r border-gray-200'}
            overflow-y-auto
          `}>
              <MenuOpciones Theme={Theme} isCollapsed={isCollapsed} isMobileOpen={isMobileOpen} setTheme={setTheme} setIsCollapsed={setIsCollapsed} setIsMobileOpen={setIsMobileOpen} toggleTheme={toggleTheme} />
      </div>
    </>
  )
}
