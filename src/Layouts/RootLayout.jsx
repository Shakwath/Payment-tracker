import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Common/Navbar';
import Footer from '../Components/Common/Footer';


const RootLayout = () => {
    return (
        <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-300">
            <Navbar></Navbar>
            <div>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;