import { createContext, useContext, ReactNode, useState } from 'react'

interface ThemeContextType {
  theme: 'neo-aurora'
  colors: {
    background: string
    primary: string
    accent: string
    text: string
    secondary: string
  }
  toggleTheme?: () => void // For future expansion
}

const neoAuroraColors = {
  background: '#0B1020',
  primary: '#6366F1',
  accent: '#10B981',
  text: '#F9FAFB',
  secondary: '#374151',
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme] = useState<'neo-aurora'>('neo-aurora')

  const value: ThemeContextType = {
    theme,
    colors: neoAuroraColors,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
