import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Toast from '../components/Toast';

function Body() {
  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
        <Toast />
    </div>
  )
}

export default Body;