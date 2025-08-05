import React, {useState, useEffect} from 'react'
//import {FaHome, FaChartBar, FaUsers, FaCog, FaSignOutAlt, FaBars, FaTimes}  from "react-icons/fa"; 
import * as Icons from "react-icons/fa"
// Carga Dinamica de Iconos
    const DynamicIcon = ({ iconName }) => {
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

        return Icon ? <Icon /> : <span>Cargando...</span>;
    };
export default function CargaDinamicaIconos() {
  return (
    <div>CargaDinamicaIconos</div>
  )
}



