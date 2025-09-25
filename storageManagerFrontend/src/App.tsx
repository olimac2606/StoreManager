import SideBar from './assets/components/SideBar';
import SelectedProductsContextProvider from './assets/contexts/SelectedProductsContext';
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className='flex'>
      <SideBar />
      <main className='w-full'>
        <SelectedProductsContextProvider>
          <Outlet />
        </SelectedProductsContextProvider>
      </main>
    </div>
  )
}