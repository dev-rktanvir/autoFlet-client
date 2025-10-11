import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Components/NavBar/NavBar';
import Footer from '../../Components/Footer/Footer';
import useAuth from '../../hooks/useAuth/useAuth';
import Loading from '../../Components/Loading/Loading';

const MainLayout = () => {
    const { loading } = useAuth();
    if (loading) {
        return <Loading></Loading>
    }
    return (
        <div>
            {/* Header Part */}
            <header>
                <Navbar></Navbar>
            </header>
            {/* Main Part */}
            <main>
                <Outlet></Outlet>
            </main>
            {/* Footer Part */}
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;