import React from 'react'
import { FaBars, FaBell, FaExpand, FaSearch, FaCog, FaEnvelopeOpenText } from 'react-icons/fa'

export default function Sidebar_05_Header({Theme, isCollapsed, isMobileOpen}) {

  return (
    <div>
      {/* Navbar Superior (similar a la imagen) */}
      <header className={`
        fixed top-0 left-0 right-0 z-30 flex items-center justify-between p-4 shadow-md
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'md:ml-20' : 'md:ml-75'}
        ${Theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 border-b border-gray-200'}
      `}>
        {/* Botón para colapsar/expandir el sidebar (solo en escritorio) */}
        <button
        //   onClick={() => setIsCollapsed(!isCollapsed)}
          className={`hidden md:block p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500
            ${Theme === 'dark' ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'}`}
          aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
        >
          <FaBars size={20} /> 
        </button>

        {/* Navegación superior derecha */}
        <div className="flex items-center ml-auto space-x-4">
          <a href="#" className={`${Theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
             <FaSearch size={20} /> 
          </a>
          <a href="#" className={`${Theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
            <FaBell size={20} /> 
          </a>
          <a href="#" className={`${Theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>            
            <FaEnvelopeOpenText size={20}/> 
          </a>
          <a href="#" className={`${Theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>            
            <FaExpand size={20} /> 
          </a>
          <a href="#" className={`${Theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>            
            <FaCog size={20} /> 
          </a>
        </div>
      </header>    
    </div>
  )
}
