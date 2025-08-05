// Importaciones necesarias de React y Font Awesome
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faChartBar, faUsers, faCog, faSignOutAlt, faBars, faTimes,
  faEnvelope, faSun, faMoon, faAngleLeft, faAngleDown, faSearch, faUserCircle,
  faBell, faEnvelopeOpenText, faExpand, faTh
} from '@fortawesome/free-solid-svg-icons';



// Asegúrate de instalar Font Awesome si aún no lo has hecho:
// npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome

const CollapsibleSidebar = ({ onNavigate }) => {
  // Estado para controlar si el sidebar está abierto/colapsado (en escritorio) o visible (en móvil)
  const [isCollapsed, setIsCollapsed] = useState(false); // true = colapsado, false = expandido
  const [isMobileOpen, setIsMobileOpen] = useState(false); // true = sidebar visible en móvil

  // Estado para controlar el tema actual: 'light' o 'dark'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  // Efecto para aplicar las clases de tema al elemento <html> y guardar en localStorage
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      if (theme === 'dark') {
        html.classList.add('dark');
        html.classList.remove('light');
      } else {
        html.classList.add('light');
        html.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme]); // Se ejecuta cada vez que el tema cambia

  // Función para alternar el tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Definición de los elementos de navegación del sidebar con links a webs diversas
  // NOTA: Algunos sitios web pueden bloquear su carga en iframes por seguridad (X-Frame-Options).
  const navItems = [
    { name: 'Dashboard', icon: faTh, link: 'https://www.google.com' },
    { name: 'Widgets', icon: faTh, link: 'https://www.wikipedia.org/wiki/Widget' },
    {
      name: 'Layout Options', icon: faAngleLeft, link: '#', subItems: [
        { name: 'Top Navigation', link: 'https://www.w3schools.com/css/css_navbar.asp' },
        { name: 'Top Navigation + Sidebar', link: 'https://getbootstrap.com/docs/5.0/examples/dashboard/' },
        { name: 'Boxed', link: 'https://www.css-tricks.com/the-difference-between-box-sizing-content-box-and-box-sizing-border-box/' },
        { name: 'Fixed Sidebar', link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/position#fixed' },
        { name: 'Fixed Sidebar + Custom Area', link: 'https://react.dev/' },
        { name: 'Fixed Navbar', link: 'https://tailwindcss.com/docs/fixed-position' },
        { name: 'Fixed Footer', link: 'https://tailwindcss.com/docs/fixed-position' },
        { name: 'Collapsed Sidebar', link: 'https://www.google.com/search?q=collapsed+sidebar+example' },
      ]
    },
    { name: 'Charts', icon: faChartBar, link: 'https://d3js.org/' },
    { name: 'Users', icon: faUsers, link: 'https://github.com/trending' },
  ];

  // Estado para controlar la apertura/cierre de sub-menús
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (itemName) => {
    setOpenSubmenu(openSubmenu === itemName ? null : itemName);
  };

  // Manejador de clic para los enlaces de navegación
  const handleNavLinkClick = (link) => {
    if (onNavigate) {
      onNavigate(link);       // Llama a la función pasada por prop para actualizar la URL del iframe
      setIsMobileOpen(false); // Cierra el sidebar en móviles después de la navegación
    }
  };

  return (
    <>
      {/* Botón de menú para dispositivos móviles (visible solo en pantallas pequeñas) */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 text-gray-700 bg-white rounded-md shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label={isMobileOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <FontAwesomeIcon icon={isMobileOpen ? faTimes : faBars} className="h-6 w-6" />
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

      {/* Sidebar principal */}
      <aside
        className={`
          fixed inset-y-0 left-0 h-full
          p-4 space-y-6
          transform transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
          md:translate-x-0 md:relative md:flex-shrink-0 md:shadow-lg
          ${isCollapsed ? 'md:w-20' : 'md:w-64'}
          ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900 border-r border-gray-200'}
          overflow-y-auto
        `}
      >
        {/* Encabezado del sidebar - Logo y nombre */}
        <div className={`flex items-center justify-between pb-4 ${isCollapsed ? 'justify-center' : ''}`}>
          {!isCollapsed && (
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
              AdminLTE 3
            </h1>
          )}
          {/* Botón de cierre para móviles */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className={`md:hidden ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} focus:outline-none`}
            aria-label="Cerrar sidebar"
          >
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </button>
        </div>

        {/* Perfil de usuario */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''} mb-6`}>
          <img
            className="h-10 w-10 rounded-full object-cover mr-3"
            src="https://placehold.co/40x40/cccccc/333333?text=AP" // Placeholder para la imagen de perfil
            alt="User Avatar"
          />
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Alexander Pierce</span>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Online</span>
            </div>
          )}
        </div>

        {/* Campo de búsqueda */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder={isCollapsed ? '' : 'Search...'}
              className={`w-full p-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500
                ${theme === 'dark' ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-200 text-gray-900 placeholder-gray-500'}`}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
            />
          </div>
        </div>

        {/* Navegación principal */}
        <nav className="flex-1">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                {item.subItems ? (
                  // Elemento con sub-menú
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`flex items-center justify-between w-full text-left p-2 rounded-md transition duration-200 ease-in-out
                      ${theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                      }`}
                  >
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={item.icon} className={`mr-3 ${isCollapsed ? 'text-xl' : ''}`} />
                      {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                    </div>
                    {!isCollapsed && (
                      <FontAwesomeIcon
                        icon={openSubmenu === item.name ? faAngleDown : faAngleLeft}
                        className="text-xs ml-auto"
                      />
                    )}
                  </button>
                ) : (
                  // Elemento sin sub-menú
                  <button
                    onClick={() => handleNavLinkClick(item.link)}
                    className={`flex items-center w-full text-left p-2 rounded-md transition duration-200 ease-in-out
                      ${theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                      }`}
                  >
                    <FontAwesomeIcon icon={item.icon} className={`mr-3 ${isCollapsed ? 'text-xl' : ''}`} />
                    {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                  </button>
                )}

                {/* Sub-menú */}
                {item.subItems && openSubmenu === item.name && (
                  <ul className={`pl-6 mt-1 space-y-1 ${isCollapsed ? 'hidden' : ''}`}>
                    {item.subItems.map((subItem) => (
                      <li key={subItem.name}>
                        <button
                          onClick={() => handleNavLinkClick(subItem.link)}
                          className={`flex items-center w-full text-left p-2 rounded-md transition duration-200 ease-in-out
                            ${theme === 'dark'
                              ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                              : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                            }`}
                        >
                          <span className="text-sm font-medium">{subItem.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Botón de cambio de tema */}
        <div className={`pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={toggleTheme}
            className={`flex items-center justify-center w-full p-3 rounded-md transition duration-200 ease-in-out
              ${theme === 'dark'
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            aria-label={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
          >
            <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} className={`mr-3 text-xl ${isCollapsed ? 'mx-auto' : ''}`} />
            {!isCollapsed && (
              <span className="text-base font-medium">
                {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
              </span>
            )}
          </button>
        </div>

        {/* Sección de "Cerrar Sesión" */}
        <div className={`mt-auto pt-6 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <a
            href="/logout"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center p-3 rounded-md transition duration-200 ease-in-out
              ${theme === 'dark'
                ? 'text-red-300 hover:bg-red-700 hover:text-white'
                : 'text-red-600 hover:bg-red-100 hover:text-red-800'
              }`}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className={`mr-3 text-xl ${isCollapsed ? 'mx-auto' : ''}`} />
            {!isCollapsed && <span className="text-base font-medium">Cerrar Sesión</span>}
          </a>
        </div>
      </aside>

      {/* Navbar Superior (similar a la imagen) */}
      <header className={`
        fixed top-0 left-0 right-0 z-30 flex items-center justify-between p-4 shadow-md
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'md:ml-20' : 'md:ml-64'}
        ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 border-b border-gray-200'}
      `}>
        {/* Botón para colapsar/expandir el sidebar (solo en escritorio) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`hidden md:block p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500
            ${theme === 'dark' ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'}`}
          aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
        >
          <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
        </button>

        {/* Navegación superior derecha */}
        <div className="flex items-center ml-auto space-x-4">
          <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
            <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
          </a>
          <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
            <FontAwesomeIcon icon={faBell} className="h-5 w-5" />
          </a>
          <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
            <FontAwesomeIcon icon={faEnvelopeOpenText} className="h-5 w-5" />
          </a>
          <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
            <FontAwesomeIcon icon={faExpand} className="h-5 w-5" />
          </a>
          <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
            <FontAwesomeIcon icon={faCog} className="h-5 w-5" />
          </a>
        </div>
      </header>
    </>
  );
};

export default CollapsibleSidebar;
