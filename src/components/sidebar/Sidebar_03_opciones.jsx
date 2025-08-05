import React, { useState, useEffect } from 'react'
import data from './Sidebar_04.json'; // Assuming the JSON file is in the same directory
import { FaSignOutAlt, FaMoon, FaSun, FaSearch, FaTimes } from 'react-icons/fa'

// Fa para Font Awesome, puedes cambiarlo según la librería
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import {faHome, faChartBar, faUsers, faCog, faSignOutAlt, faBars, faTimes,
//         faEnvelope, faSun, faMoon, faAngleLeft, faAngleDown, faSearch, faUserCircle,
//          faBell, faEnvelopeOpenText, faExpand, faTh } from '@fortawesome/free-solid-svg-icons'; 

export default function Sidebar_03_opciones({Theme, isCollapsed, isMobileOpen,  setTheme, setIsCollapsed, setIsMobileOpen, toggleTheme}) {

    console.log('Data from JSON:', data);

    //Carga Dinámica de Iconos
    const DynamicIcon = ({ iconName, iconSize }) => {

        const [Icon, setIcon] = useState(null);
        useEffect(() => {
            const loadIcon = async () => {
                try {
                    const { [iconName]: LoadedIcon } = await import('react-icons/fa'); // Cambia 'fa' por la librería que uses (ej. 'md', 'ai', etc.)
                    setIcon(() => LoadedIcon);
                } catch (error) {
                    console.error(`Error al cargar el ícono: ${iconName}`, error);
                }
            };
            loadIcon();
        }, [iconName]);
        return Icon ? <Icon size={iconSize}/> : '' ;
    };

    const handleNavLinkClick = (link) => {
        // Lógica para manejar el clic en el enlace de navegación
        console.log('Navegando a:', link);
    };

  return (
    <>
    {/* Encabezado del sidebar */}
    <div className={`flex items-center justify-center pb-4 ${isCollapsed ? 'justify-center' : ''}`}>
        {!isCollapsed && (
            <h6 className={`font-bold ${Theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>          
                ADMINISTRACION DEL SISTEMA
            </h6>
    )}       
    </div>

    <nav className='sidebar-options'>              
        {/* ----- Perfil de usuario ------ */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''} mb-6`}>
          <img
            className="h-10 w-10 rounded-full object-cover mr-3"
            src="https://placehold.co/40x40/cccccc/333333?text=AP" // Placeholder para la imagen de perfil
            alt="User Avatar"
          />
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className={`font-semibold ${Theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Alexander Pierce</span>
              <span className={`text-sm ${Theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Online</span>
            </div>
          )}
        </div>

        {/* ---- Campo de búsqueda ---- */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder={isCollapsed ? '' : 'Buscar ...'}
              className={`w-full p-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500
                ${Theme === 'dark' ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-200 text-gray-900 placeholder-gray-500'}`}
            />

            {/* -- Icono de búsqueda dentro del input de busqueda -- */}
            <FaSearch size={25} className={`absolute left-3 top-1/2 -translate-y-1/2 ${Theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} /> 
            
          </div>
        </div>

        {data.OpcionesMenu.map(opcion => (
            <div key={opcion.id}>
                <button
                    onClick={() => handleNavLinkClick(opcion.link)}
                    className={`flex items-center w-full text-left p-2 rounded-md transition duration-200 ease-in-out h-10
                      ${Theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                      }`}
                  >                                        
                    <DynamicIcon iconName={opcion.icon} iconSize={20}/>                    
                    <span className="ml-2 text-base font-medium">{opcion.name}</span>
                    
                </button>              
            </div>
        ))}

        <hr />
        {/* -------- Sección de "Modo Oscuro / Light "-------- */}
        <div className={`mt-auto border-t ${Theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
                onClick={toggleTheme}
                className={`flex items-center justify-center w-full p-3 rounded-md transition duration-200 ease-in-out
                    ${Theme === 'dark'
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                aria-label={`Cambiar a tema ${Theme === 'light' ? 'oscuro' : 'claro'}`}
                >                

                {Theme === 'light' ? <FaMoon size={25} className = 'ml-8'/> :  <FaSun size={25} className = 'ml-8'/>}
                {!isCollapsed && (
                    <span className="text-base font-medium ml-3 mx-auto">
                        {Theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
                    </span>
                )}
            </button>            
        </div>
        <hr />
        {/* -------- Sección de "Cerrar Sesión" --------- */}
        <div className={`mt-auto border-t ${Theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <a
                href="/logout"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center p-3 rounded-md transition duration-200 ease-in-out
                ${Theme === 'dark' ? 'text-red-300 hover:bg-red-700 hover:text-white' : 'text-red-600 hover:bg-red-100 hover:text-red-800'}`}
            >            
            <FaSignOutAlt size={35} className='ml-8'/> {!isCollapsed && <span className="text-base font-bold ml-3 mx-auto w-full"> Cerrar Sesión</span>}
            </a>
        </div>
        <hr />
    </nav>       
    </>
  )
}