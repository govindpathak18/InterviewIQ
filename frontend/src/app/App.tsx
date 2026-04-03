import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { AuthProvider } from './providers/auth.provider'
import { ThemeProvider } from './providers/theme.provider'
import Main from './Main'
import Header from '../shared/components/layout/header'
import Footer from '../shared/components/layout/footer'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1 pt-16">
                <Main />
              </main>
              <Footer />
            </div>
            <Toaster />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
