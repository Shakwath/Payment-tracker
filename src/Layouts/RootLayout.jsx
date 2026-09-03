import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Common/Navbar';
import Footer from '../Components/Common/Footer';
import { ThemeProvider } from '../Context/ThemeProvider';
import AuthProvider from '../Context/AuthProvider';


const RootLayout = () => {
    return (
        <AuthProvider>
            <ThemeProvider>
                <div className="min-h-screen bg-gradient-to-b from-purple-100/70 via-purple-50/30 via-30% to-base-100 dark:from-purple-950/50 dark:via-slate-900 dark:to-base-100 text-base-content transition-colors duration-300">

                    <Navbar></Navbar>
                    <div>
                        <Outlet></Outlet>
                    </div>
                    <Footer></Footer>
                </div>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default RootLayout;