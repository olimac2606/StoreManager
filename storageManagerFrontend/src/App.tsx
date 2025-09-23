import SideBar from './assets/components/SideBar';
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className='flex'>
      <SideBar />
      <main className='w-full'>
        <Outlet />
      </main>
    </div>
  )
}