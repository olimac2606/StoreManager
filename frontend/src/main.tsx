import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Products from './assets/pages/Products'
import Dashboard from './assets/pages/Dashboard'
import Reports from './assets/pages/Reports'
import Sales from './assets/pages/Sales'
import Suppliers from './assets/pages/Suppliers'
import NonFoundPage from './assets/components/NonFoundPage'
import { Provider } from "@/components/ui/provider"
import App from './App'
import { Toaster } from './components/ui/toaster'
import SelectedProductsContextProvider from './assets/contexts/SelectedProductsContext';
import EditingProductContextProvider from './assets/contexts/EditingProductContext';
import EditingSupplierContextProvider from './assets/contexts/EditingSupplierContext'
import CategoriesContextProvider from './assets/contexts/CategoriesContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: 'products', element:
          <EditingProductContextProvider>
            <CategoriesContextProvider>
              <Products />
            </CategoriesContextProvider>
          </EditingProductContextProvider>
      },
      { path: 'reports', element: <Reports /> },
      {
        path: 'sales', element:
          <SelectedProductsContextProvider>
            <Sales />
          </SelectedProductsContextProvider>
      },
      {
        path: 'suppliers', element:
          <EditingSupplierContextProvider>
            <Suppliers />
          </EditingSupplierContextProvider>
      },
      { path: '*', element: <NonFoundPage /> },
    ],
  }

])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </StrictMode>,
)
