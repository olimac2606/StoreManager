// React core imports for application setup
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

// Page components for different application routes
import Products from './assets/pages/Products'
import Dashboard from './assets/pages/Dashboard'
import Reports from './assets/pages/Reports'
import Sales from './assets/pages/Sales'
import Suppliers from './assets/pages/Suppliers'
import NonFoundPage from './assets/components/NonFoundPage'

// UI components and providers
import { Provider } from "@/components/ui/provider"
import App from './App'
import { Toaster } from './components/ui/toaster'

// Context providers for state management across components
import SelectedProductsContextProvider from './assets/contexts/SelectedProductsContext';
import EditingProductContextProvider from './assets/contexts/EditingProductContext';
import EditingSupplierContextProvider from './assets/contexts/EditingSupplierContext'
import CategoriesContextProvider from './assets/contexts/CategoriesContext'

// Application routing configuration with nested routes and context providers
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Dashboard as the default route (index route)
      { index: true, element: <Dashboard /> },
      // Products page wrapped with editing and categories context for state management
      {
        path: 'products', element:
          <EditingProductContextProvider>
            <CategoriesContextProvider>
              <Products />
            </CategoriesContextProvider>
          </EditingProductContextProvider>
      },
      // Reports page for analytics and reporting
      { path: 'reports', element: <Reports /> },
      // Sales page with selected products context for cart functionality
      {
        path: 'sales', element:
          <SelectedProductsContextProvider>
            <Sales />
          </SelectedProductsContextProvider>
      },
      // Suppliers page with editing context for supplier management
      {
        path: 'suppliers', element:
          <EditingSupplierContextProvider>
            <Suppliers />
          </EditingSupplierContextProvider>
      },
      // Catch-all route for 404 pages
      { path: '*', element: <NonFoundPage /> },
    ],
  }

])
// Initialize React application with routing and global providers
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </StrictMode>,
)
