import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const MainLayout = () => (
  <div>
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);

export default MainLayout;