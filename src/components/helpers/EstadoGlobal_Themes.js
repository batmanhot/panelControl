
import { create } from 'zustand';

const useThemes = create((set) => ({  
  Theme: 'light', // Estado inicial del tema
  isCollapsed: false, // Estado inicial de colapso
  isMobileOpen: false, // Estado inicial de apertura móvil
  setTheme: (newTheme) => set({ Theme: newTheme }), // Función para cambiar el tema
  setIsCollapsed: (collapsed) => set({ isCollapsed: collapsed }), // Función para cambiar el estado de colapso
  setIsMobileOpen: (open) => set({ isMobileOpen: open }), // Función para cambiar el estado de apertura móvil 
}));

export default useThemes; 