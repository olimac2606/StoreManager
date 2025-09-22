import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import Products from './assets/pages/Products'
import Dashboard from './assets/pages/Dashboard'
import Reports from './assets/pages/Reports'
import Sales from './assets/pages/Sales'
import Suppliers from './assets/pages/Suppliers'
import NonFoundPage from './assets/components/NonFoundPage'
import { Provider } from "@/components/ui/provider"
import App from './App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {index: true, element: <Dashboard />},
      {path: 'products', element: <Products />},
      {path: 'reports', element: <Reports />},
      {path: 'sales', element: <Sales />},
      {path: 'suppliers', element: <Suppliers />},
      {path: '*', element: <NonFoundPage />},
    ],
  }

])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
