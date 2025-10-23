// Main layout components
import SideBar from './assets/components/SideBar';
import { Outlet } from "react-router-dom";

/**
 * Main application component that provides the layout structure
 * Contains the sidebar navigation and main content area where child routes render
 */
export default function App() {
  return (
    <div className='flex'>
      {/* Navigation sidebar for main application sections */}
      <SideBar />
      {/* Main content area where page components are rendered via routing */}
      <main className='w-full'>  
        <Outlet />
      </main>
    </div>
  )
}