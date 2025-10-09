import React from 'react';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div>
            {/* Header Part */}
            <header>

            </header>
            {/* Main Part */}
            <main>
                <Outlet></Outlet>
            </main>
            {/* Footer Part */}
            <footer>

            </footer>
        </div>
    );
};

export default MainLayout;