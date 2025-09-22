import SideBar from './assets/components/SideBar';
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div>
      <SideBar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}